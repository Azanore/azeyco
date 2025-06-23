const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const {
  sendSuccessResponse,
  sendErrorResponse,
  sendValidationError,
  sendNotFoundError,
} = require("../utils/responseUtils");

/**
 * Update user profile information
 * @route PUT /api/users/profile
 * @access Private
 */
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendValidationError(res, errors.array());
    }
    const userId = req.userId;
    const { firstName, lastName, bio } = req.body;
    const user = await userService.updateUserProfile(userId, {
      firstName,
      lastName,
      bio,
    });
    sendSuccessResponse(res, 200, "Profile updated successfully", { user });
  } catch (error) {
    if (error.message === "User not found") {
      return sendNotFoundError(res, "User");
    }
    sendErrorResponse(res, 500, "Server error");
  }
};

/**
 * Upload profile picture
 * @route POST /api/users/profile/picture
 * @access Private
 */
const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userService.uploadUserPicture(
      userId,
      req.file,
      "profile"
    );
    sendSuccessResponse(res, 200, "Profile picture uploaded successfully", {
      user,
    });
  } catch (error) {
    if (error.message === "No file uploaded") {
      return sendErrorResponse(res, 400, error.message);
    }
    if (error.message === "User not found") {
      return sendNotFoundError(res, "User");
    }
    sendErrorResponse(res, 500, "Server error");
  }
};

/**
 * Upload cover picture
 * @route POST /api/users/profile/cover
 * @access Private
 */
const uploadCoverPicture = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userService.uploadUserPicture(userId, req.file, "cover");
    sendSuccessResponse(res, 200, "Cover picture uploaded successfully", {
      user,
    });
  } catch (error) {
    if (error.message === "No file uploaded") {
      return sendErrorResponse(res, 400, error.message);
    }
    if (error.message === "User not found") {
      return sendNotFoundError(res, "User");
    }
    sendErrorResponse(res, 500, "Server error");
  }
};

/**
 * Remove profile picture
 * @route DELETE /api/users/profile/picture
 * @access Private
 */
const removeProfilePicture = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userService.removeUserPicture(userId, "profile");
    sendSuccessResponse(res, 200, "Profile picture removed successfully", {
      user,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return sendNotFoundError(res, "User");
    }
    sendErrorResponse(res, 500, "Server error");
  }
};

/**
 * Remove cover picture
 * @route DELETE /api/users/profile/cover
 * @access Private
 */
const removeCoverPicture = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userService.removeUserPicture(userId, "cover");
    sendSuccessResponse(res, 200, "Cover picture removed successfully", {
      user,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return sendNotFoundError(res, "User");
    }
    sendErrorResponse(res, 500, "Server error");
  }
};

module.exports = {
  updateProfile,
  uploadProfilePicture,
  uploadCoverPicture,
  removeProfilePicture,
  removeCoverPicture,
};
