import express from 'express';
import { Item, User } from '../models/index.js';
import { authenticate, optionalAuthenticate, requireOwnershipOrAdmin } from '../middleware/auth.js';
import { uploadItemImages, handleUploadError, cleanupOnError } from '../middleware/upload.js';
import { validateItemCreation, validateItemUpdate, validateItemSearch, validatePagination, validateObjectId, handleValidationErrors } from '../middleware/validation.js';
import { catchAsync, AppError } from '../middleware/errorHandler.js';

const router = express.Router();

// Get all items with search and filters
router.get('/',
  optionalAuthenticate,
  validateItemSearch,
  validatePagination,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const items = await Item.search(req.query.q, {
      ...req.query,
      limit: parseInt(limit),
      skip,
    });

    const total = await Item.countDocuments({
      status: 'active',
      moderationStatus: 'approved',
    });

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
  })
);

// Create new item
router.post('/',
  authenticate,
  uploadItemImages,
  handleUploadError,
  cleanupOnError,
  validateItemCreation,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const itemData = {
      ...req.body,
      seller: req.user._id,
    };

    // Process uploaded images
    if (req.files && req.files.length > 0) {
      itemData.images = req.files.map((file, index) => ({
        url: `/uploads/items/${file.filename}`,
        filename: file.filename,
        alt: `${req.body.title} - Image ${index + 1}`,
        isPrimary: index === 0,
      }));
    }

    const item = new Item(itemData);
    await item.save();

    await item.populate('seller', 'firstName lastName avatar');

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: { item },
    });
  })
);

// Get item by ID
router.get('/:id',
  optionalAuthenticate,
  validateObjectId('id'),
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const item = await Item.findById(req.params.id)
      .populate('seller', 'firstName lastName avatar stats.rating stats.totalRatings university')
      .populate('conversations');

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    // Increment view count (but not for the seller)
    if (!req.user || !req.user._id.equals(item.seller._id)) {
      await item.incrementViews();
    }

    // Get similar items
    const similarItems = await item.getSimilarItems(5);

    res.json({
      success: true,
      data: {
        item,
        similarItems,
      },
    });
  })
);

// Update item
router.patch('/:id',
  authenticate,
  uploadItemImages,
  handleUploadError,
  cleanupOnError,
  validateObjectId('id'),
  validateItemUpdate,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    // Check ownership
    if (!req.user._id.equals(item.seller) && req.user.role !== 'admin') {
      throw new AppError('Access denied', 403);
    }

    const allowedUpdates = ['title', 'description', 'price', 'condition', 'brand', 'model', 'isNegotiable', 'deliveryOptions', 'paymentMethods', 'status'];
    const updates = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Handle new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file, index) => ({
        url: `/uploads/items/${file.filename}`,
        filename: file.filename,
        alt: `${updates.title || item.title} - Image ${item.images.length + index + 1}`,
        isPrimary: item.images.length === 0 && index === 0,
      }));
      updates.images = [...item.images, ...newImages];
    }

    Object.assign(item, updates);
    await item.save();

    await item.populate('seller', 'firstName lastName avatar');

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: { item },
    });
  })
);

// Delete item
router.delete('/:id',
  authenticate,
  validateObjectId('id'),
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    // Check ownership
    if (!req.user._id.equals(item.seller) && req.user.role !== 'admin') {
      throw new AppError('Access denied', 403);
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Item deleted successfully',
    });
  })
);

// Mark item as sold
router.patch('/:id/sold',
  authenticate,
  validateObjectId('id'),
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { buyerId, finalPrice } = req.body;
    
    const item = await Item.findById(req.params.id);

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    // Check ownership
    if (!req.user._id.equals(item.seller)) {
      throw new AppError('Access denied', 403);
    }

    await item.markAsSold(buyerId, finalPrice);
    await item.populate('seller', 'firstName lastName');

    res.json({
      success: true,
      message: 'Item marked as sold',
      data: { item },
    });
  })
);

// Get categories
router.get('/meta/categories',
  catchAsync(async (req, res) => {
    const categories = [
      { id: 'textbooks', name: 'Textbooks', icon: '📚' },
      { id: 'electronics', name: 'Electronics', icon: '💻' },
      { id: 'furniture', name: 'Furniture', icon: '🪑' },
      { id: 'clothing', name: 'Clothing', icon: '👕' },
      { id: 'sports', name: 'Sports & Recreation', icon: '⚽' },
      { id: 'miscellaneous', name: 'Miscellaneous', icon: '📦' },
    ];

    // Get item counts for each category
    const categoryCounts = await Item.aggregate([
      { $match: { status: 'active', moderationStatus: 'approved' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const categoryMap = categoryCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const categoriesWithCounts = categories.map(category => ({
      ...category,
      count: categoryMap[category.id] || 0,
    }));

    res.json({
      success: true,
      data: { categories: categoriesWithCounts },
    });
  })
);

export default router;
