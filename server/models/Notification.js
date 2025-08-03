import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    required: true,
    enum: [
      'new_message',
      'new_offer',
      'offer_accepted',
      'offer_declined',
      'item_sold',
      'item_favorited',
      'item_view',
      'price_drop',
      'item_expired',
      'account_verified',
      'system_announcement',
      'safety_alert'
    ],
  },
  title: {
    type: String,
    required: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  message: {
    type: String,
    required: true,
    maxlength: [500, 'Message cannot exceed 500 characters'],
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // Flexible data for different notification types
  },
  relatedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  },
  relatedConversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: Date,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  deliveryMethods: [{
    type: String,
    enum: ['in_app', 'email', 'push'],
    default: 'in_app',
  }],
  deliveryStatus: {
    in_app: {
      type: String,
      enum: ['pending', 'delivered', 'failed'],
      default: 'delivered',
    },
    email: {
      type: String,
      enum: ['pending', 'sent', 'delivered', 'failed'],
    },
    push: {
      type: String,
      enum: ['pending', 'sent', 'delivered', 'failed'],
    },
  },
  expiresAt: Date,
}, {
  timestamps: true,
});

// Indexes
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to mark as read
notificationSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

// Static method to create notification
notificationSchema.statics.createNotification = function(data) {
  return this.create(data);
};

// Static method to mark all as read for user
notificationSchema.statics.markAllAsReadForUser = function(userId) {
  return this.updateMany(
    { recipient: userId, isRead: false },
    { isRead: true, readAt: new Date() }
  );
};

export default mongoose.model('Notification', notificationSchema);
