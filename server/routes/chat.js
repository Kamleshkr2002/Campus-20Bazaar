import express from "express";
import { Conversation, Message, Item } from "../models/index.js";
import { authenticate, messageRateLimit } from "../middleware/auth.js";
import {
  uploadMessageAttachments,
  handleUploadError,
} from "../middleware/upload.js";
import {
  validateMessageCreation,
  validatePagination,
  validateObjectId,
  handleValidationErrors,
} from "../middleware/validation.js";
import { catchAsync, AppError } from "../middleware/errorHandler.js";

const router = express.Router();

// Get user's conversations
router.get(
  "/conversations",
  authenticate,
  validatePagination,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const conversations = await Conversation.findForUser(req.user._id, {
      limit: parseInt(limit),
      skip,
    });

    // Add unread count for each conversation
    const conversationsWithUnread = conversations.map((conv) => {
      const unreadCount = conv.getUnreadCount(req.user._id);
      return {
        ...conv.toObject(),
        unreadCount,
      };
    });

    res.json({
      success: true,
      data: {
        conversations: conversationsWithUnread,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
        },
      },
    });
  }),
);

// Start or get conversation
router.post(
  "/conversations",
  authenticate,
  catchAsync(async (req, res) => {
    const { itemId, participantId } = req.body;

    if (!itemId) {
      throw new AppError("Item ID is required", 400);
    }

    // Get item and verify it exists
    const item = await Item.findById(itemId);
    if (!item) {
      throw new AppError("Item not found", 404);
    }

    // Determine participants
    let participants = [req.user._id];

    if (participantId) {
      participants.push(participantId);
    } else {
      // If no participant specified, assume conversation with item seller
      participants.push(item.seller);
    }

    // Can't start conversation with yourself
    if (participants[0].equals(participants[1])) {
      throw new AppError("Cannot start conversation with yourself", 400);
    }

    const conversation = await Conversation.findOrCreate(participants, itemId);

    res.status(200).json({
      success: true,
      data: { conversation },
    });
  }),
);

// Get conversation by ID
router.get(
  "/conversations/:id",
  authenticate,
  validateObjectId("id"),
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const conversation = await Conversation.findById(req.params.id)
      .populate("participants", "firstName lastName avatar")
      .populate("item", "title price images status")
      .populate("lastMessage");

    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    // Check if user is participant
    if (!conversation.participants.some((p) => p._id.equals(req.user._id))) {
      throw new AppError("Access denied", 403);
    }

    // Mark conversation as read
    await conversation.markAsRead(req.user._id);

    res.json({
      success: true,
      data: { conversation },
    });
  }),
);

// Get messages in conversation
router.get(
  "/conversations/:id/messages",
  authenticate,
  validateObjectId("id"),
  validatePagination,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { page = 1, limit = 50, before } = req.query;
    const skip = (page - 1) * limit;

    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    // Check if user is participant
    if (!conversation.participants.some((p) => p.equals(req.user._id))) {
      throw new AppError("Access denied", 403);
    }

    const messages = await Message.findInConversation(req.params.id, {
      limit: parseInt(limit),
      skip,
      before,
    });

    res.json({
      success: true,
      data: {
        messages: messages.reverse(), // Reverse to show oldest first
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
        },
      },
    });
  }),
);

// Send message
router.post(
  "/conversations/:id/messages",
  authenticate,
  messageRateLimit,
  uploadMessageAttachments,
  handleUploadError,
  validateObjectId("id"),
  validateMessageCreation,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { content, type = "text", offer } = req.body;

    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    // Check if user is participant
    if (!conversation.participants.some((p) => p.equals(req.user._id))) {
      throw new AppError("Access denied", 403);
    }

    // Check if conversation is blocked
    if (conversation.metadata.isBlocked) {
      throw new AppError("This conversation is blocked", 403);
    }

    const messageData = {
      conversation: req.params.id,
      sender: req.user._id,
      content,
      type,
    };

    // Handle offer messages
    if (type === "offer" && offer) {
      messageData.offer = offer;
    }

    // Handle file attachments
    if (req.files && req.files.length > 0) {
      messageData.attachments = req.files.map((file) => ({
        url: `/uploads/messages/${file.filename}`,
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
      }));
      messageData.type = "file";
    }

    const message = new Message(messageData);
    await message.save();

    // Update conversation
    conversation.lastMessage = message._id;
    conversation.lastMessageAt = new Date();
    await conversation.incrementUnreadCount(req.user._id);

    await message.populate("sender", "firstName lastName avatar");

    res.status(201).json({
      success: true,
      data: { message },
    });
  }),
);

// Mark message as read
router.patch(
  "/messages/:id/read",
  authenticate,
  validateObjectId("id"),
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const message = await Message.findById(req.params.id);

    if (!message) {
      throw new AppError("Message not found", 404);
    }

    await message.markAsRead(req.user._id);

    res.json({
      success: true,
      message: "Message marked as read",
    });
  }),
);

// Update offer status
router.patch(
  "/messages/:id/offer",
  authenticate,
  validateObjectId("id"),
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { status } = req.body;

    if (!["accepted", "declined"].includes(status)) {
      throw new AppError("Invalid offer status", 400);
    }

    const message = await Message.findById(req.params.id).populate(
      "conversation",
    );

    if (!message) {
      throw new AppError("Message not found", 404);
    }

    if (message.type !== "offer") {
      throw new AppError("This message is not an offer", 400);
    }

    // Check if user is authorized to respond to offer
    const conversation = message.conversation;
    const isParticipant = conversation.participants.some((p) =>
      p.equals(req.user._id),
    );
    const isNotSender = !message.sender.equals(req.user._id);

    if (!isParticipant || !isNotSender) {
      throw new AppError("Access denied", 403);
    }

    await message.updateOfferStatus(status);

    res.json({
      success: true,
      message: `Offer ${status}`,
      data: { message },
    });
  }),
);

// Block conversation
router.patch(
  "/conversations/:id/block",
  authenticate,
  validateObjectId("id"),
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    // Check if user is participant
    if (!conversation.participants.some((p) => p.equals(req.user._id))) {
      throw new AppError("Access denied", 403);
    }

    await conversation.block(req.user._id);

    res.json({
      success: true,
      message: "Conversation blocked",
    });
  }),
);

// Unblock conversation
router.patch(
  "/conversations/:id/unblock",
  authenticate,
  validateObjectId("id"),
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      throw new AppError("Conversation not found", 404);
    }

    // Check if user is participant
    if (!conversation.participants.some((p) => p.equals(req.user._id))) {
      throw new AppError("Access denied", 403);
    }

    await conversation.unblock();

    res.json({
      success: true,
      message: "Conversation unblocked",
    });
  }),
);

export default router;
