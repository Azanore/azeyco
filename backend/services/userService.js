/**
 * User Service - Handles user-related business logic
 * Follows Service Layer pattern and Single Responsibility Principle
 */
const User = require("../models/User");
const jwtService = require("./jwtService");

/**
 * Create a new user account
 * @param {Object} userData - User registration data
 * @returns {Object} Created user and token
 */
const createUser = async (userData) => {
  const { username, email, password, firstName, lastName } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    const errorMessage =
      existingUser.email === email
        ? "Email already registered"
        : "Username already taken";
    throw new Error(errorMessage);
  }

  // Create new user
  const user = new User({
    username,
    email,
    password,
    firstName,
    lastName,
  });

  await user.save();

  // Generate JWT token
  const token = jwtService.generateToken(user._id);

  return {
    user: user.getPublicProfile(),
    token,
  };
};

/**
 * Authenticate user login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User data and token
 */
const authenticateUser = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check if user is active
  if (!user.isActive) {
    throw new Error("Account is deactivated");
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const token = jwtService.generateToken(user._id);

  return {
    user: user.getPublicProfile(),
    token,
  };
};

/**
 * Get user profile by ID
 * @param {string} userId - User ID
 * @returns {Object} User profile data
 */
const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return user.getPublicProfile();
};

/**
 * Check if user exists by email or username
 * @param {string} email - Email to check
 * @param {string} username - Username to check
 * @returns {boolean} True if user exists
 */
const userExists = async (email, username) => {
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  return !!existingUser;
};

module.exports = {
  createUser,
  authenticateUser,
  getUserProfile,
  userExists,
};
