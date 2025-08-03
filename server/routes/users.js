import express from "express";
import { User, Item } from "../models/index.js";
import {
  authenticate,
  requireAdmin,
  requireOwnershipOrAdmin,
} from "../middleware/auth.js";
import {
  uploadAvatar,
  handleUploadError,
  cleanupOnError,
} from "../middleware/upload.js";
import {
  validateUserUpdate,
  validatePagination,
  handleValidationErrors,
} from "../middleware/validation.js";
import { catchAsync, AppError } from "../middleware/errorHandler.js";

const router = express.Router();

// Get user profile by ID
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id).populate({
      path: "itemsForSale",
      match: { status: "active" },
      options: { limit: 10, sort: { createdAt: -1 } },
    });

    if (!user || !user.isActive) {
      throw new AppError("User not found", 404);
    }

    res.json({
      success: true,
      data: { user },
    });
  }),
);

// Update user profile
router.patch(
  "/profile",
  authenticate,
  uploadAvatar,
  handleUploadError,
  cleanupOnError,
  validateUserUpdate,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const allowedUpdates = [
      "firstName",
      "lastName",
      "phone",
      "bio",
      "location",
      "preferences",
    ];
    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Handle avatar upload
    if (req.file) {
      updates.avatar = {
        url: `/uploads/avatars/${req.file.filename}`,
        filename: req.file.filename,
      };
    }

    Object.assign(req.user, updates);
    await req.user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: { user: req.user },
    });
  }),
);

// Get user's items
router.get(
  "/:id/items",
  validatePagination,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { page = 1, limit = 20, status = "active" } = req.query;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.params.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const items = await Item.find({ seller: req.params.id, status })
      .populate("seller", "firstName lastName avatar")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Item.countDocuments({ seller: req.params.id, status });

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  }),
);

// Admin routes
router.get(
  "/",
  authenticate,
  requireAdmin,
  validatePagination,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { page = 1, limit = 20, search, university, isVerified } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (university) {
      query.university = { $regex: university, $options: "i" };
    }

    if (isVerified !== undefined) {
      query.isEmailVerified = isVerified === "true";
    }

    const users = await User.find(query)
      .select("-password -refreshTokens")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  }),
);

export default router;
