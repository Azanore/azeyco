/**
 * Authentication Middleware - Protects routes requiring authentication
 * Follows Single Responsibility Principle
 */
const User = require("../models/User");
const jwtService = require("../services/jwtService");
const { sendUnauthorizedError } = require("../utils/responseUtils");

/**
 * Middleware to protect routes requiring authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const protect = async (req, res, next) => {
  try {
    const token = extractTokenFromHeaders(req);

    if (!token) {
      return sendUnauthorizedError(res, "Access denied. No token provided.");
    }

    const userId = jwtService.extractUserIdFromToken(token);
    const user = await getUserFromToken(userId);

    if (!user) {
      return sendUnauthorizedError(res, "Token is not valid.");
    }

    if (!user.isActive) {
      return sendUnauthorizedError(res, "Account is deactivated.");
    }

    // Add user data to request object
    req.userId = userId;
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    handleAuthError(error, res);
  }
};

/**
 * Extract JWT token from request headers
 * @param {Object} req - Express request object
 * @returns {string|null} JWT token or null
 */
const extractTokenFromHeaders = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

/**
 * Get user from database by ID
 * @param {string} userId - User ID
 * @returns {Object|null} User object or null
 */
const getUserFromToken = async (userId) => {
  return await User.findById(userId).select("-password");
};

/**
 * Handle authentication errors
 * @param {Error} error - Error object
 * @param {Object} res - Express response object
 */
const handleAuthError = (error, res) => {
  if (error.name === "JsonWebTokenError") {
    return sendUnauthorizedError(res, "Token is not valid.");
  }

  if (error.name === "TokenExpiredError") {
    return sendUnauthorizedError(res, "Token has expired.");
  }

  sendUnauthorizedError(res, "Server error during authentication.");
};

module.exports = { protect };
