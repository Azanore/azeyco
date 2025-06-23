/**
 * User Routes - API endpoints for user operations
 * Follows RESTful conventions and separation of concerns
 */
const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const {
  registerValidation,
  loginValidation,
} = require("../validators/userValidators");

const router = express.Router();

// Public routes
// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerValidation, registerUser);

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post("/login", loginValidation, loginUser);

// Protected routes
// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get("/profile", protect, getProfile);

module.exports = router;
