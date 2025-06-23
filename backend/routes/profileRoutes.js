const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { updateProfileValidation } = require("../validators/profileValidators");
const {
  updateProfile,
  uploadProfilePicture,
  uploadCoverPicture,
  removeProfilePicture,
  removeCoverPicture,
} = require("../controllers/profileController");
const {
  uploadProfilePicture: uploadProfilePic,
  uploadCoverPicture: uploadCoverPic,
} = require("../middleware/upload");

// @route   PUT /api/users/profile
// @desc    Update user profile information
// @access  Private
router.put("/", protect, ...updateProfileValidation, updateProfile);

// @route   POST /api/users/profile/picture
// @desc    Upload profile picture
// @access  Private
router.post(
  "/picture",
  protect,
  uploadProfilePic.single("image"),
  uploadProfilePicture
);

// @route   POST /api/users/profile/cover
// @desc    Upload cover picture
// @access  Private
router.post(
  "/cover",
  protect,
  uploadCoverPic.single("image"),
  uploadCoverPicture
);

// @route   DELETE /api/users/profile/picture
// @desc    Remove profile picture
// @access  Private
router.delete("/picture", protect, removeProfilePicture);

// @route   DELETE /api/users/profile/cover
// @desc    Remove cover picture
// @access  Private
router.delete("/cover", protect, removeCoverPicture);

module.exports = router;
