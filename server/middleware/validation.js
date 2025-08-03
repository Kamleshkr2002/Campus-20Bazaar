import { body, param, query, validationResult } from "express-validator";
import mongoose from "mongoose";

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
      value: error.value,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  next();
};

// User validation rules
export const validateUserRegistration = [
  body("firstName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, and one number",
    ),

  body("university")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("University name must be between 2 and 100 characters"),

  body("studentId")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Student ID must be between 3 and 20 characters"),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
];

export const validateUserLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),
];

export const validateUserUpdate = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),

  body("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
];

// Item validation rules
export const validateItemCreation = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("price")
    .isFloat({ min: 0, max: 50000 })
    .withMessage("Price must be between $0 and $50,000"),

  body("originalPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Original price must be a positive number"),

  body("category")
    .isIn([
      "textbooks",
      "electronics",
      "furniture",
      "clothing",
      "sports",
      "miscellaneous",
    ])
    .withMessage("Invalid category"),

  body("condition")
    .isIn(["new", "like-new", "good", "fair", "poor"])
    .withMessage("Invalid condition"),

  body("brand")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Brand cannot exceed 50 characters"),

  body("model")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Model cannot exceed 100 characters"),

  body("isNegotiable")
    .optional()
    .isBoolean()
    .withMessage("isNegotiable must be a boolean"),

  body("deliveryOptions")
    .optional()
    .isArray()
    .withMessage("Delivery options must be an array"),

  body("deliveryOptions.*")
    .optional()
    .isIn(["pickup", "delivery", "shipping"])
    .withMessage("Invalid delivery option"),

  body("paymentMethods")
    .optional()
    .isArray()
    .withMessage("Payment methods must be an array"),

  body("paymentMethods.*")
    .optional()
    .isIn(["cash", "venmo", "paypal", "zelle", "card"])
    .withMessage("Invalid payment method"),
];

export const validateItemUpdate = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10 and 2000 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0, max: 50000 })
    .withMessage("Price must be between $0 and $50,000"),

  body("condition")
    .optional()
    .isIn(["new", "like-new", "good", "fair", "poor"])
    .withMessage("Invalid condition"),

  body("status")
    .optional()
    .isIn(["active", "sold", "reserved", "inactive"])
    .withMessage("Invalid status"),
];

// Message validation rules
export const validateMessageCreation = [
  body("content")
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage("Message content must be between 1 and 2000 characters"),

  body("type")
    .optional()
    .isIn(["text", "image", "file", "offer"])
    .withMessage("Invalid message type"),

  body("offer.amount")
    .if(body("type").equals("offer"))
    .isFloat({ min: 0 })
    .withMessage("Offer amount must be a positive number"),
];

// Report validation rules
export const validateReportCreation = [
  body("type")
    .isIn([
      "inappropriate_content",
      "spam",
      "scam",
      "fake_item",
      "harassment",
      "violence",
      "hate_speech",
      "intellectual_property",
      "other",
    ])
    .withMessage("Invalid report type"),

  body("reason")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Report reason must be between 10 and 1000 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),
];

// Query validation rules
export const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];

export const validateItemSearch = [
  query("q")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search query must be between 1 and 100 characters"),

  query("category")
    .optional()
    .isIn([
      "textbooks",
      "electronics",
      "furniture",
      "clothing",
      "sports",
      "miscellaneous",
    ])
    .withMessage("Invalid category"),

  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be a positive number"),

  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be a positive number"),

  query("condition")
    .optional()
    .isIn(["new", "like-new", "good", "fair", "poor"])
    .withMessage("Invalid condition"),

  query("sortBy")
    .optional()
    .isIn(["createdAt", "price", "views", "favorites"])
    .withMessage("Invalid sort field"),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort order must be asc or desc"),
];

// Parameter validation rules
export const validateObjectId = (paramName) => [
  param(paramName).custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error(`Invalid ${paramName}`);
    }
    return true;
  }),
];

// Custom validators
export const customValidators = {
  isValidObjectId: (value) => {
    return mongoose.Types.ObjectId.isValid(value);
  },

  isArrayOfObjectIds: (value) => {
    if (!Array.isArray(value)) return false;
    return value.every((id) => mongoose.Types.ObjectId.isValid(id));
  },

  isValidPhoneNumber: (value) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(value);
  },

  isStrongPassword: (value) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    return strongPasswordRegex.test(value);
  },
};

export default {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validateItemCreation,
  validateItemUpdate,
  validateMessageCreation,
  validateReportCreation,
  validatePagination,
  validateItemSearch,
  validateObjectId,
  customValidators,
};
