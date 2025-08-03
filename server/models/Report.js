import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reportedItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  },
  reportedMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  type: {
    type: String,
    required: true,
    enum: [
      'inappropriate_content',
      'spam',
      'scam',
      'fake_item',
      'harassment',
      'violence',
      'hate_speech',
      'intellectual_property',
      'other'
    ],
  },
  reason: {
    type: String,
    required: [true, 'Report reason is required'],
    trim: true,
    maxlength: [1000, 'Report reason cannot exceed 1000 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  evidence: [{
    url: String,
    publicId: String,
    description: String,
  }],
  status: {
    type: String,
    enum: ['pending', 'investigating', 'resolved', 'dismissed'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  resolution: {
    action: {
      type: String,
      enum: [
        'no_action',
        'warning_sent',
        'content_removed',
        'user_suspended',
        'user_banned',
        'item_hidden',
        'other'
      ],
    },
    notes: String,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    resolvedAt: Date,
  },
  moderatorNotes: [{
    moderator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    note: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

// Indexes
reportSchema.index({ reporter: 1 });
reportSchema.index({ reportedUser: 1 });
reportSchema.index({ reportedItem: 1 });
reportSchema.index({ status: 1, priority: 1 });
reportSchema.index({ createdAt: -1 });

export default mongoose.model('Report', reportSchema);
