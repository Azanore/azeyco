/**
 * User Service - Handles user-related business logic
 * Follows Service Layer pattern and Single Responsibility Principle
 */
const User = require("../models/User");
const jwtService = require("./jwtService");
const fs = require("fs");
const path = require("path");

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

/**
 * Update user profile information
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update (firstName, lastName, bio)
 * @returns {Object} Updated user profile
 */
const updateUserProfile = async (userId, updates) => {
  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });
  if (!user) throw new Error("User not found");
  return user.getPublicProfile();
};

/**
 * Upload profile or cover picture
 * @param {string} userId - User ID
 * @param {Object} file - Multer file object
 * @param {string} type - 'profile' or 'cover'
 * @returns {Object} Updated user profile
 */
const uploadUserPicture = async (userId, file, type) => {
  if (!file) throw new Error("No file uploaded");
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const filePath = file.path.replace(/\\/g, "/");
  const field = type === "profile" ? "profilePicture" : "coverPicture";
  // Delete old picture if it exists and is different
  if (user[field] && user[field] !== filePath) {
    const oldFilePath = path.join(__dirname, "..", user[field]);
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
  }
  user[field] = filePath;
  await user.save();
  return user.getPublicProfile();
};

/**
 * Remove profile or cover picture
 * @param {string} userId - User ID
 * @param {string} type - 'profile' or 'cover'
 * @returns {Object} Updated user profile
 */
const removeUserPicture = async (userId, type) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const field = type === "profile" ? "profilePicture" : "coverPicture";
  if (user[field]) {
    const filePath = path.join(__dirname, "..", user[field]);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    user[field] = null;
    await user.save();
  }
  return user.getPublicProfile();
};

module.exports = {
  createUser,
  authenticateUser,
  getUserProfile,
  userExists,
  updateUserProfile,
  uploadUserPicture,
  removeUserPicture,
};
