import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { config } from '../config/config.js';
import { AppError } from './errorHandler.js';
import logger from '../utils/logger.js';

// Create upload directory if it doesn't exist
const uploadDir = path.join(process.cwd(), config.uploadPath);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create subdirectories based on file type
    let subDir = 'misc';
    if (file.fieldname === 'avatar') {
      subDir = 'avatars';
    } else if (file.fieldname === 'itemImages') {
      subDir = 'items';
    } else if (file.fieldname === 'attachments') {
      subDir = 'messages';
    }
    
    const fullPath = path.join(uploadDir, subDir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + uniqueSuffix + ext;
    cb(null, name);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check if file upload is enabled
  if (!config.features.enableFileUpload) {
    return cb(new AppError('File upload is currently disabled', 403));
  }

  // Check file type
  if (!config.allowedFileTypes.includes(file.mimetype)) {
    logger.warn(`Rejected file upload: ${file.mimetype} from ${req.ip}`);
    return cb(new AppError(`File type ${file.mimetype} is not allowed`, 400));
  }

  cb(null, true);
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.maxFileSize,
    files: 10, // Maximum 10 files at once
  },
});

// Middleware for different upload types
export const uploadAvatar = upload.single('avatar');

export const uploadItemImages = upload.array('itemImages', 5); // Max 5 images per item

export const uploadMessageAttachments = upload.array('attachments', 3); // Max 3 attachments per message

export const uploadMultiple = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'itemImages', maxCount: 5 },
  { name: 'attachments', maxCount: 3 },
]);

// Error handling middleware for multer
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    let message;
    
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        message = `File too large. Maximum size is ${config.maxFileSize / 1024 / 1024}MB`;
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files uploaded';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected file field';
        break;
      default:
        message = 'File upload error';
    }
    
    logger.warn(`Upload error: ${err.code} from ${req.ip}`);
    return res.status(400).json({
      success: false,
      message,
    });
  }
  
  next(err);
};

// Utility function to delete file
export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      logger.info(`Deleted file: ${filePath}`);
      return true;
    }
  } catch (error) {
    logger.error(`Error deleting file ${filePath}:`, error);
    return false;
  }
  return false;
};

// Utility function to delete multiple files
export const deleteFiles = (filePaths) => {
  const results = [];
  filePaths.forEach(filePath => {
    results.push(deleteFile(filePath));
  });
  return results;
};

// Middleware to clean up files on error
export const cleanupOnError = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // If there's an error and files were uploaded, clean them up
    if (res.statusCode >= 400 && req.files) {
      const filesToDelete = [];
      
      if (Array.isArray(req.files)) {
        filesToDelete.push(...req.files.map(file => file.path));
      } else if (typeof req.files === 'object') {
        Object.values(req.files).forEach(fileArray => {
          if (Array.isArray(fileArray)) {
            filesToDelete.push(...fileArray.map(file => file.path));
          }
        });
      }
      
      if (req.file) {
        filesToDelete.push(req.file.path);
      }
      
      if (filesToDelete.length > 0) {
        deleteFiles(filesToDelete);
        logger.info(`Cleaned up ${filesToDelete.length} files due to error`);
      }
    }
    
    originalSend.call(this, data);
  };
  
  next();
};

// Middleware to validate uploaded images
export const validateImages = (req, res, next) => {
  if (!req.files && !req.file) {
    return next();
  }
  
  const files = req.files ? 
    (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) : 
    [req.file];
  
  for (const file of files) {
    // Additional validation can be added here
    if (!file.mimetype.startsWith('image/')) {
      deleteFile(file.path);
      return res.status(400).json({
        success: false,
        message: `File ${file.originalname} is not a valid image`,
      });
    }
    
    // Check image dimensions, file integrity, etc.
    // This would require additional libraries like sharp or jimp
  }
  
  next();
};

// Generate file URL helper
export const generateFileUrl = (req, filePath) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const relativePath = path.relative(process.cwd(), filePath);
  return `${baseUrl}/${relativePath.replace(/\\/g, '/')}`;
};

// Process uploaded files helper
export const processUploadedFiles = (req) => {
  const processedFiles = [];
  
  if (req.file) {
    processedFiles.push({
      url: generateFileUrl(req, req.file.path),
      path: req.file.path,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
  }
  
  if (req.files) {
    const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
    files.forEach(file => {
      processedFiles.push({
        url: generateFileUrl(req, file.path),
        path: file.path,
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      });
    });
  }
  
  return processedFiles;
};

export default {
  uploadAvatar,
  uploadItemImages,
  uploadMessageAttachments,
  uploadMultiple,
  handleUploadError,
  cleanupOnError,
  validateImages,
  deleteFile,
  deleteFiles,
  generateFileUrl,
  processUploadedFiles,
};
