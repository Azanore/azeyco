const User = require("../models/User");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

/**
 * Update user profile information
 * @route PUT /api/users/profile
 * @access Private
 */
const updateProfile = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { firstName, lastName, bio } = req.body;
    const userId = req.user.id;

    // Find user and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        bio,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Upload profile picture
 * @route POST /api/users/profile/picture
 * @access Private
 */
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const userId = req.user.id;
    const filePath = req.file.path;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete old profile picture if it exists
    if (user.profilePicture && user.profilePicture !== filePath) {
      const oldFilePath = path.join(__dirname, "..", user.profilePicture);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Update user with new profile picture path
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: filePath.replace(/\\/g, "/"), // Normalize path for cross-platform
      },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile picture uploaded successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Profile picture upload error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Upload cover picture
 * @route POST /api/users/profile/cover
 * @access Private
 */
const uploadCoverPicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const userId = req.user.id;
    const filePath = req.file.path;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete old cover picture if it exists
    if (user.coverPicture && user.coverPicture !== filePath) {
      const oldFilePath = path.join(__dirname, "..", user.coverPicture);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Update user with new cover picture path
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        coverPicture: filePath.replace(/\\/g, "/"), // Normalize path for cross-platform
      },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Cover picture uploaded successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Cover picture upload error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Remove profile picture
 * @route DELETE /api/users/profile/picture
 * @access Private
 */
const removeProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete file if it exists
    if (user.profilePicture) {
      const filePath = path.join(__dirname, "..", user.profilePicture);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Update user to remove profile picture
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: null,
      },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile picture removed successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Profile picture removal error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * Remove cover picture
 * @route DELETE /api/users/profile/cover
 * @access Private
 */
const removeCoverPicture = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete file if it exists
    if (user.coverPicture) {
      const filePath = path.join(__dirname, "..", user.coverPicture);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Update user to remove cover picture
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        coverPicture: null,
      },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Cover picture removed successfully",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error("Cover picture removal error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  updateProfile,
  uploadProfilePicture,
  uploadCoverPicture,
  removeProfilePicture,
  removeCoverPicture,
};
