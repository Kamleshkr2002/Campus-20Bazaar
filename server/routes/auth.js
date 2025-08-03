import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/index.js";
import {
  authenticate,
  authRateLimit,
  passwordResetRateLimit,
  emailVerificationRateLimit,
} from "../middleware/index.js";
import {
  validateUserRegistration,
  validateUserLogin,
  handleValidationErrors,
} from "../middleware/validation.js";
import { catchAsync, AppError } from "../middleware/errorHandler.js";
import logger from "../utils/logger.js";

const router = express.Router();

// Register new user
router.post(
  "/register",
  authRateLimit,
  validateUserRegistration,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      university,
      studentId,
      phone,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new AppError("User with this email already exists", 400);
    }

    // Check if student ID is already used at this university
    const existingStudent = await User.findOne({ studentId, university });
    if (existingStudent) {
      throw new AppError(
        "Student ID already registered at this university",
        400,
      );
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      university,
      studentId,
      phone,
    });

    await user.save();

    // Generate tokens
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    await user.save(); // Save refresh token

    logger.info(`New user registered: ${user.email}`);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: user.toJSON(),
        accessToken,
        refreshToken,
      },
    });
  }),
);

// Login user
router.post(
  "/login",
  authRateLimit,
  validateUserLogin,
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findByEmail(email).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!user.isActive) {
      throw new AppError("Account is deactivated", 401);
    }

    // Clean expired refresh tokens
    user.cleanExpiredRefreshTokens();

    // Generate tokens
    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    logger.info(`User logged in: ${user.email}`);

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: user.toJSON(),
        accessToken,
        refreshToken,
      },
    });
  }),
);

// Refresh access token
router.post(
  "/refresh",
  catchAsync(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError("Refresh token is required", 400);
    }

    try {
      const decoded = jwt.verify(refreshToken, config.jwtSecret);
      const user = await User.findById(decoded.userId);

      if (!user || !user.isActive) {
        throw new AppError("Invalid refresh token", 401);
      }

      // Check if refresh token exists in user's tokens
      const tokenExists = user.refreshTokens.some(
        (tokenObj) =>
          tokenObj.token === refreshToken && tokenObj.expiresAt > new Date(),
      );

      if (!tokenExists) {
        throw new AppError("Invalid or expired refresh token", 401);
      }

      // Generate new access token
      const newAccessToken = user.generateAuthToken();

      res.json({
        success: true,
        message: "Token refreshed successfully",
        data: {
          accessToken: newAccessToken,
        },
      });
    } catch (error) {
      throw new AppError("Invalid refresh token", 401);
    }
  }),
);

// Logout user
router.post(
  "/logout",
  authenticate,
  catchAsync(async (req, res) => {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Remove the specific refresh token
      req.user.refreshTokens = req.user.refreshTokens.filter(
        (tokenObj) => tokenObj.token !== refreshToken,
      );
      await req.user.save();
    }

    logger.info(`User logged out: ${req.user.email}`);

    res.json({
      success: true,
      message: "Logout successful",
    });
  }),
);

// Logout from all devices
router.post(
  "/logout-all",
  authenticate,
  catchAsync(async (req, res) => {
    req.user.refreshTokens = [];
    await req.user.save();

    logger.info(`User logged out from all devices: ${req.user.email}`);

    res.json({
      success: true,
      message: "Logged out from all devices",
    });
  }),
);

// Get current user profile
router.get(
  "/me",
  authenticate,
  catchAsync(async (req, res) => {
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  }),
);

// Send email verification
router.post(
  "/send-verification",
  emailVerificationRateLimit,
  authenticate,
  catchAsync(async (req, res) => {
    if (req.user.isEmailVerified) {
      throw new AppError("Email is already verified", 400);
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    req.user.emailVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    req.user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    await req.user.save();

    // In a real app, you would send an email here
    // For now, we'll just return the token (remove in production)
    logger.info(`Email verification token generated for ${req.user.email}`);

    res.json({
      success: true,
      message: "Verification email sent",
      // Remove this in production:
      verificationToken:
        config.nodeEnv === "development" ? verificationToken : undefined,
    });
  }),
);

// Verify email
router.post(
  "/verify-email/:token",
  catchAsync(async (req, res) => {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError("Invalid or expired verification token", 400);
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    logger.info(`Email verified for user: ${user.email}`);

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  }),
);

// Forgot password
router.post(
  "/forgot-password",
  passwordResetRateLimit,
  catchAsync(async (req, res) => {
    const { email } = req.body;

    if (!email) {
      throw new AppError("Email is required", 400);
    }

    const user = await User.findByEmail(email);

    if (!user) {
      // Don't reveal if email exists or not
      return res.json({
        success: true,
        message:
          "If an account with that email exists, a password reset link has been sent",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    // In a real app, send email here
    logger.info(`Password reset token generated for ${user.email}`);

    res.json({
      success: true,
      message:
        "If an account with that email exists, a password reset link has been sent",
      // Remove this in production:
      resetToken: config.nodeEnv === "development" ? resetToken : undefined,
    });
  }),
);

// Reset password
router.post(
  "/reset-password/:token",
  catchAsync(async (req, res) => {
    const { password } = req.body;

    if (!password) {
      throw new AppError("Password is required", 400);
    }

    if (password.length < 8) {
      throw new AppError("Password must be at least 8 characters long", 400);
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError("Invalid or expired reset token", 400);
    }

    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshTokens = []; // Logout from all devices

    await user.save();

    logger.info(`Password reset successful for user: ${user.email}`);

    res.json({
      success: true,
      message: "Password reset successful",
    });
  }),
);

// Change password
router.patch(
  "/change-password",
  authenticate,
  catchAsync(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new AppError("Current password and new password are required", 400);
    }

    // Get user with password
    const user = await User.findById(req.user._id).select("+password");

    if (!(await user.comparePassword(currentPassword))) {
      throw new AppError("Current password is incorrect", 400);
    }

    if (newPassword.length < 8) {
      throw new AppError(
        "New password must be at least 8 characters long",
        400,
      );
    }

    user.password = newPassword;
    await user.save();

    logger.info(`Password changed for user: ${user.email}`);

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  }),
);

export default router;
