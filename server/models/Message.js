import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
  },
  type: {
    type: String,
    enum: ['text', 'image', 'file', 'offer', 'system'],
    default: 'text',
  },
  // For file/image messages
  attachments: [{
    url: String,
    publicId: String, // For Cloudinary
    fileName: String,
    fileSize: Number,
    mimeType: String,
  }],
  // For offer messages
  offer: {
    amount: Number,
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined', 'expired'],
      default: 'pending',
    },
    expiresAt: Date,
  },
  // Message status
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent',
  },
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    readAt: {
      type: Date,
      default: Date.now,
    },
  }],
  // For system messages
  systemMessageType: {
    type: String,
    enum: [
      'item_sold',
      'item_reserved',
      'item_unreserved',
      'user_joined',
      'user_left',
      'conversation_created'
    ],
  },
  // Message reactions
  reactions: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    emoji: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  // Reply to another message
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  // Message editing
  editedAt: Date,
  editHistory: [{
    content: String,
    editedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  // Message deletion
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
  deletedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes
messageSchema.index({ conversation: 1, createdAt: 1 });
messageSchema.index({ sender: 1 });
messageSchema.index({ status: 1 });
messageSchema.index({ 'offer.status': 1 });
messageSchema.index({ createdAt: -1 });

// Virtual for time since sent
messageSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return 'now';
});

// Pre-save middleware
messageSchema.pre('save', function(next) {
  // Auto-expire offers after 24 hours if no expiry is set
  if (this.type === 'offer' && this.offer && !this.offer.expiresAt) {
    this.offer.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }
  next();
});

// Method to mark as read by user
messageSchema.methods.markAsRead = function(userId) {
  const existingRead = this.readBy.find(read => read.user.equals(userId));
  if (!existingRead) {
    this.readBy.push({
      user: userId,
      readAt: new Date(),
    });
    this.status = 'read';
  }
  return this.save();
};

// Method to add reaction
messageSchema.methods.addReaction = function(userId, emoji) {
  // Remove existing reaction from this user
  this.reactions = this.reactions.filter(reaction => !reaction.user.equals(userId));
  
  // Add new reaction
  this.reactions.push({
    user: userId,
    emoji,
  });
  
  return this.save();
};

// Method to remove reaction
messageSchema.methods.removeReaction = function(userId) {
  this.reactions = this.reactions.filter(reaction => !reaction.user.equals(userId));
  return this.save();
};

// Method to edit message
messageSchema.methods.editContent = function(newContent) {
  // Save to edit history
  this.editHistory.push({
    content: this.content,
  });
  
  this.content = newContent;
  this.editedAt = new Date();
  
  return this.save();
};

// Method to delete message for specific users
messageSchema.methods.deleteForUsers = function(userIds) {
  userIds.forEach(userId => {
    if (!this.deletedFor.includes(userId)) {
      this.deletedFor.push(userId);
    }
  });
  
  return this.save();
};

// Method to delete message completely
messageSchema.methods.deleteCompletely = function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  this.content = 'This message was deleted';
  return this.save();
};

// Method to accept/decline offer
messageSchema.methods.updateOfferStatus = function(status) {
  if (this.type === 'offer' && this.offer) {
    this.offer.status = status;
    return this.save();
  }
  throw new Error('This message is not an offer');
};

// Static method to find messages in conversation
messageSchema.statics.findInConversation = function(conversationId, options = {}) {
  const { limit = 50, skip = 0, before } = options;
  
  let query = { conversation: conversationId, isDeleted: false };
  
  if (before) {
    query.createdAt = { $lt: before };
  }
  
  return this.find(query)
    .populate('sender', 'firstName lastName avatar')
    .populate('replyTo')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);
};

// Static method to create system message
messageSchema.statics.createSystemMessage = function(conversationId, type, content) {
  return this.create({
    conversation: conversationId,
    sender: null, // System messages don't have a sender
    content,
    type: 'system',
    systemMessageType: type,
    status: 'read', // System messages are automatically read
  });
};

export default mongoose.model('Message', messageSchema);
