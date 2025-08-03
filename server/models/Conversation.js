import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Track read status for each participant
    readStatus: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        lastReadAt: {
          type: Date,
          default: Date.now,
        },
        unreadCount: {
          type: Number,
          default: 0,
        },
      },
    ],
    // Conversation metadata
    metadata: {
      isBlocked: {
        type: Boolean,
        default: false,
      },
      blockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      blockedAt: Date,
      isMuted: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          mutedUntil: Date,
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes
conversationSchema.index({ participants: 1 });
conversationSchema.index({ item: 1 });
conversationSchema.index({ lastMessageAt: -1 });
conversationSchema.index({ participants: 1, item: 1 }, { unique: true });

// Virtual for messages
conversationSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "conversation",
  options: { sort: { createdAt: 1 } },
});

// Method to add participant
conversationSchema.methods.addParticipant = function (userId) {
  if (!this.participants.includes(userId)) {
    this.participants.push(userId);
    this.readStatus.push({
      user: userId,
      lastReadAt: new Date(),
      unreadCount: 0,
    });
  }
  return this.save();
};

// Method to remove participant
conversationSchema.methods.removeParticipant = function (userId) {
  this.participants = this.participants.filter((id) => !id.equals(userId));
  this.readStatus = this.readStatus.filter(
    (status) => !status.user.equals(userId),
  );
  return this.save();
};

// Method to mark as read for a user
conversationSchema.methods.markAsRead = function (userId) {
  const userReadStatus = this.readStatus.find((status) =>
    status.user.equals(userId),
  );
  if (userReadStatus) {
    userReadStatus.lastReadAt = new Date();
    userReadStatus.unreadCount = 0;
  }
  return this.save();
};

// Method to increment unread count for other participants
conversationSchema.methods.incrementUnreadCount = function (senderId) {
  this.readStatus.forEach((status) => {
    if (!status.user.equals(senderId)) {
      status.unreadCount += 1;
    }
  });
  return this.save();
};

// Method to get unread count for a user
conversationSchema.methods.getUnreadCount = function (userId) {
  const userReadStatus = this.readStatus.find((status) =>
    status.user.equals(userId),
  );
  return userReadStatus ? userReadStatus.unreadCount : 0;
};

// Method to block conversation
conversationSchema.methods.block = function (userId) {
  this.metadata.isBlocked = true;
  this.metadata.blockedBy = userId;
  this.metadata.blockedAt = new Date();
  return this.save();
};

// Method to unblock conversation
conversationSchema.methods.unblock = function () {
  this.metadata.isBlocked = false;
  this.metadata.blockedBy = undefined;
  this.metadata.blockedAt = undefined;
  return this.save();
};

// Static method to find or create conversation
conversationSchema.statics.findOrCreate = async function (
  participants,
  itemId,
) {
  // Sort participants to ensure consistent order
  const sortedParticipants = participants.sort();

  let conversation = await this.findOne({
    participants: { $all: sortedParticipants },
    item: itemId,
  })
    .populate("participants", "firstName lastName avatar")
    .populate("item", "title price primaryImage")
    .populate("lastMessage");

  if (!conversation) {
    conversation = new this({
      participants: sortedParticipants,
      item: itemId,
      readStatus: sortedParticipants.map((userId) => ({
        user: userId,
        lastReadAt: new Date(),
        unreadCount: 0,
      })),
    });

    await conversation.save();

    // Populate the newly created conversation
    conversation = await this.findById(conversation._id)
      .populate("participants", "firstName lastName avatar")
      .populate("item", "title price primaryImage")
      .populate("lastMessage");
  }

  return conversation;
};

// Static method to find conversations for a user
conversationSchema.statics.findForUser = function (userId, options = {}) {
  const { limit = 20, skip = 0 } = options;

  return this.find({
    participants: userId,
    isActive: true,
  })
    .populate("participants", "firstName lastName avatar")
    .populate("item", "title price images status")
    .populate("lastMessage")
    .sort({ lastMessageAt: -1 })
    .limit(limit)
    .skip(skip);
};

export default mongoose.model("Conversation", conversationSchema);
