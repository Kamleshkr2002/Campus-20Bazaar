import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    max: [50000, 'Price cannot exceed $50,000'],
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'textbooks',
      'electronics',
      'furniture',
      'clothing',
      'sports',
      'miscellaneous'
    ],
  },
  subcategory: {
    type: String,
    trim: true,
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['new', 'like-new', 'good', 'fair', 'poor'],
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [50, 'Brand cannot exceed 50 characters'],
  },
  model: {
    type: String,
    trim: true,
    maxlength: [100, 'Model cannot exceed 100 characters'],
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
    publicId: String, // For Cloudinary
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false,
    },
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller is required'],
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'reserved', 'inactive'],
    default: 'active',
  },
  location: {
    campus: String,
    building: String,
    meetupPreferences: [String], // e.g., ['library', 'student center', 'dormitory']
  },
  specifications: {
    type: Map,
    of: String, // Flexible key-value pairs for item-specific specs
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  views: {
    type: Number,
    default: 0,
  },
  favorites: {
    type: Number,
    default: 0,
  },
  isNegotiable: {
    type: Boolean,
    default: true,
  },
  availableFrom: {
    type: Date,
    default: Date.now,
  },
  availableUntil: Date,
  deliveryOptions: [{
    type: String,
    enum: ['pickup', 'delivery', 'shipping'],
  }],
  paymentMethods: [{
    type: String,
    enum: ['cash', 'venmo', 'paypal', 'zelle', 'card'],
  }],
  reportCount: {
    type: Number,
    default: 0,
  },
  moderationStatus: {
    type: String,
    enum: ['approved', 'pending', 'rejected', 'flagged'],
    default: 'approved',
  },
  moderationNotes: String,
  boostedUntil: Date, // For premium listing features
  soldTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  soldAt: Date,
  finalPrice: Number,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Indexes for better query performance
itemSchema.index({ seller: 1, status: 1 });
itemSchema.index({ category: 1, status: 1 });
itemSchema.index({ status: 1, createdAt: -1 });
itemSchema.index({ price: 1 });
itemSchema.index({ title: 'text', description: 'text', tags: 'text' });
itemSchema.index({ 'location.campus': 1 });
itemSchema.index({ views: -1 });
itemSchema.index({ favorites: -1 });
itemSchema.index({ boostedUntil: 1 });

// Virtual for primary image
itemSchema.virtual('primaryImage').get(function() {
  const primaryImg = this.images.find(img => img.isPrimary);
  return primaryImg || this.images[0];
});

// Virtual for time since posted
itemSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
});

// Virtual for discount percentage
itemSchema.virtual('discountPercentage').get(function() {
  if (!this.originalPrice || this.originalPrice <= this.price) return 0;
  return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
});

// Virtual for conversations
itemSchema.virtual('conversations', {
  ref: 'Conversation',
  localField: '_id',
  foreignField: 'item',
});

// Pre-save middleware
itemSchema.pre('save', function(next) {
  // Ensure at least one image is marked as primary
  if (this.images.length > 0 && !this.images.some(img => img.isPrimary)) {
    this.images[0].isPrimary = true;
  }
  
  // Lowercase tags
  if (this.tags) {
    this.tags = this.tags.map(tag => tag.toLowerCase());
  }
  
  next();
});

// Method to increment views
itemSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save({ validateBeforeSave: false });
};

// Method to mark as sold
itemSchema.methods.markAsSold = function(buyer, finalPrice) {
  this.status = 'sold';
  this.soldTo = buyer;
  this.soldAt = new Date();
  this.finalPrice = finalPrice || this.price;
  return this.save();
};

// Static method to find active items
itemSchema.statics.findActive = function() {
  return this.find({ status: 'active', moderationStatus: 'approved' });
};

// Static method to search items
itemSchema.statics.search = function(query, options = {}) {
  const {
    category,
    minPrice,
    maxPrice,
    condition,
    campus,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    limit = 20,
    skip = 0,
  } = options;
  
  let searchQuery = { status: 'active', moderationStatus: 'approved' };
  
  if (query) {
    searchQuery.$text = { $search: query };
  }
  
  if (category) {
    searchQuery.category = category;
  }
  
  if (minPrice !== undefined || maxPrice !== undefined) {
    searchQuery.price = {};
    if (minPrice !== undefined) searchQuery.price.$gte = minPrice;
    if (maxPrice !== undefined) searchQuery.price.$lte = maxPrice;
  }
  
  if (condition) {
    searchQuery.condition = condition;
  }
  
  if (campus) {
    searchQuery['location.campus'] = campus;
  }
  
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  return this.find(searchQuery)
    .populate('seller', 'firstName lastName avatar rating totalRatings')
    .sort(sort)
    .limit(limit)
    .skip(skip);
};

// Method to get similar items
itemSchema.methods.getSimilarItems = function(limit = 5) {
  return this.constructor.find({
    _id: { $ne: this._id },
    category: this.category,
    status: 'active',
    moderationStatus: 'approved',
  })
  .populate('seller', 'firstName lastName avatar')
  .limit(limit)
  .sort({ createdAt: -1 });
};

export default mongoose.model('Item', itemSchema);
