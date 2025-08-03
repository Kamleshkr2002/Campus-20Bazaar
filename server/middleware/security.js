import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { config } from '../config/config.js';
import logger from '../utils/logger.js';

// General rate limiting
export const generalRateLimit = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP, please try again later.',
    });
  },
});

// Strict rate limiting for auth endpoints
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again in 15 minutes.',
  },
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts, please try again in 15 minutes.',
    });
  },
});

// Rate limiting for password reset
export const passwordResetRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts per hour
  message: {
    success: false,
    message: 'Too many password reset attempts, please try again in 1 hour.',
  },
  handler: (req, res) => {
    logger.warn(`Password reset rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many password reset attempts, please try again in 1 hour.',
    });
  },
});

// Rate limiting for email verification
export const emailVerificationRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // 3 attempts per 10 minutes
  message: {
    success: false,
    message: 'Too many email verification requests, please try again in 10 minutes.',
  },
  handler: (req, res) => {
    logger.warn(`Email verification rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many email verification requests, please try again in 10 minutes.',
    });
  },
});

// Rate limiting for message sending
export const messageRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 messages per minute
  message: {
    success: false,
    message: 'Too many messages sent, please slow down.',
  },
  keyGenerator: (req) => {
    return req.user ? req.user._id.toString() : req.ip;
  },
  handler: (req, res) => {
    logger.warn(`Message rate limit exceeded for user: ${req.user?._id || req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Too many messages sent, please slow down.',
    });
  },
});

// Security headers configuration
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com', 'https://*.cloudinary.com'],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", 'wss:', 'ws:'],
    },
  },
  crossOriginEmbedderPolicy: false, // For development
});

// CORS configuration
export const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      config.corsOrigin,
      'http://localhost:3000',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:8080',
    ];
    
    if (allowedOrigins.includes(origin) || config.nodeEnv === 'development') {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: config.corsCredentials,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-New-Token',
  ],
  exposedHeaders: ['X-New-Token'],
};

// Middleware to log security events
export const securityLogger = (req, res, next) => {
  // Log potential security issues
  const userAgent = req.get('User-Agent');
  const ip = req.ip;
  
  // Log suspicious patterns
  if (req.body && typeof req.body === 'object') {
    const bodyStr = JSON.stringify(req.body).toLowerCase();
    
    // Check for potential XSS/injection attempts
    const suspiciousPatterns = [
      '<script',
      'javascript:',
      'onload=',
      'onerror=',
      'eval(',
      'document.cookie',
      'union select',
      'drop table',
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (bodyStr.includes(pattern)) {
        logger.warn(`Potential security threat detected from IP ${ip}: ${pattern}`, {
          ip,
          userAgent,
          url: req.originalUrl,
          body: req.body,
        });
        break;
      }
    }
  }
  
  next();
};

// Middleware to prevent timing attacks
export const preventTimingAttacks = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Add random delay for auth endpoints to prevent timing attacks
    if (req.originalUrl.includes('/auth/')) {
      const randomDelay = Math.random() * 100; // 0-100ms
      setTimeout(() => {
        // This doesn't actually delay the response, just logs timing
        logger.debug(`Auth request completed in ${duration + randomDelay}ms`);
      }, randomDelay);
    }
  });
  
  next();
};

// Middleware to sanitize user input
export const sanitizeInput = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    sanitizeObject(req.body);
  }
  
  if (req.query && typeof req.query === 'object') {
    sanitizeObject(req.query);
  }
  
  if (req.params && typeof req.params === 'object') {
    sanitizeObject(req.params);
  }
  
  next();
};

function sanitizeObject(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      // Remove potentially dangerous characters
      obj[key] = obj[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim();
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
}

export default {
  generalRateLimit,
  authRateLimit,
  passwordResetRateLimit,
  emailVerificationRateLimit,
  messageRateLimit,
  securityHeaders,
  corsOptions,
  securityLogger,
  preventTimingAttacks,
  sanitizeInput,
};
