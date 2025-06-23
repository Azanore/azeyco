/**
 * User Controller - Handles HTTP requests for user operations
 * Thin layer that delegates business logic to services
 * Follows Single Responsibility Principle
 */
const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const {
  sendSuccessResponse,
  sendErrorResponse,
  sendValidationError,
} = require("../utils/responseUtils");

/**
 * Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendValidationError(res, errors.array());
    }

    const userData = req.body;
    const result = await userService.createUser(userData);

    sendSuccessResponse(res, 201, "User registered successfully", result);
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific business logic errors
    if (
      error.message.includes("already registered") ||
      error.message.includes("already taken")
    ) {
      return sendErrorResponse(res, 400, error.message);
    }

    sendErrorResponse(res, 500, "Server error during registration");
  }
};

/**
 * Login user
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendValidationError(res, errors.array());
    }

    const { email, password } = req.body;
    const result = await userService.authenticateUser(email, password);

    sendSuccessResponse(res, 200, "Login successful", result);
  } catch (error) {
    console.error("Login error:", error);

    // Handle specific authentication errors
    if (
      error.message.includes("Invalid email or password") ||
      error.message.includes("deactivated")
    ) {
      return sendErrorResponse(res, 401, error.message);
    }

    sendErrorResponse(res, 500, "Server error during login");
  }
};

/**
 * Get current user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userService.getUserProfile(userId);

    sendSuccessResponse(res, 200, "Profile retrieved successfully", { user });
  } catch (error) {
    console.error("Get profile error:", error);

    if (error.message === "User not found") {
      return sendErrorResponse(res, 404, error.message);
    }

    sendErrorResponse(res, 500, "Server error while fetching profile");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
