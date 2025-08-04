import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { config } from "../config/config.js";
import logger from "../utils/logger.js";
import rateLimit from "express-rate-limit";


export const messageRateLimit = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // limit each IP to 5 requests per `window` (per 10 sec)
  message: {
    success: false,
    message: "Too many messages sent, please try again later",
  },
});


// Middleware to verify JWT token
export const authenticate = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.userId).select(
      "-password -refreshTokens",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token - user not found",
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    logger.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

// Optional authentication (doesn't fail if no token)
export const optionalAuthenticate = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (token) {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = await User.findById(decoded.userId).select(
        "-password -refreshTokens",
      );

      if (user && user.isActive) {
        req.user = user;
        req.token = token;
      }
    }

    next();
  } catch (error) {
    // For optional auth, we just continue without setting req.user
    next();
  }
};

// Middleware to check if user is admin
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin privileges required",
    });
  }

  next();
};

// Middleware to check if user is moderator or admin
export const requireModerator = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (!["admin", "moderator"].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Moderator privileges required",
    });
  }

  next();
};

// Middleware to check if user owns the resource or is admin
export const requireOwnershipOrAdmin = (resourceField = "seller") => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Admin can access anything
    if (req.user.role === "admin") {
      return next();
    }

    // Check ownership based on the resource
    const resource = req.resource || req.body || req.params;
    const ownerId = resource[resourceField];

    if (!ownerId || !req.user._id.equals(ownerId)) {
      return res.status(403).json({
        success: false,
        message: "Access denied - insufficient permissions",
      });
    }

    next();
  };
};

// Middleware to check if user's email is verified
export const requireEmailVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: "Email verification required",
    });
  }

  next();
};

// Middleware to check if user is verified student
export const requireStudentVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (!req.user.isStudentVerified) {
    return res.status(403).json({
      success: false,
      message: "Student verification required",
    });
  }

  next();
};

// Utility function to extract token from request
function getTokenFromRequest(req) {
  let token = null;

  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  // Check cookies
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Check query parameter (for WebSocket handshake)
  if (!token && req.query && req.query.token) {
    token = req.query.token;
  }

  return token;
}

// Middleware to refresh token if it's about to expire
export const refreshTokenIfNeeded = async (req, res, next) => {
  try {
    if (req.token && req.user) {
      const decoded = jwt.decode(req.token);
      const now = Date.now() / 1000;
      const timeUntilExpiry = decoded.exp - now;

      // If token expires in less than 1 hour, refresh it
      if (timeUntilExpiry < 3600) {
        const newToken = req.user.generateAuthToken();

        // Set new token in response header
        res.setHeader("X-New-Token", newToken);

        // Update cookie if it was originally from cookie
        if (req.cookies && req.cookies.token) {
          res.cookie("token", newToken, {
            httpOnly: true,
            secure: config.nodeEnv === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
        }

        logger.info(`Token refreshed for user ${req.user._id}`);
      }
    }

    next();
  } catch (error) {
    logger.error("Token refresh error:", error);
    next(); // Continue without refreshing
  }
};

export default {
  authenticate,
  optionalAuthenticate,
  requireAdmin,
  requireModerator,
  requireOwnershipOrAdmin,
  requireEmailVerification,
  requireStudentVerification,
  refreshTokenIfNeeded,
};
