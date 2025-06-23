const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { protect } = require("../middleware/auth");
const { uploadPostMedia } = require("../middleware/upload");
const {
  createPostValidation,
  updatePostValidation,
  getPostsValidation,
  getPostValidation,
  deletePostValidation,
} = require("../validators/postValidators");

// Configure multer for post media uploads
const postUpload = uploadPostMedia.fields([{ name: "media", maxCount: 10 }]);

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private
 */
router.post(
  "/",
  protect,
  postUpload,
  createPostValidation,
  postController.createPost
);

/**
 * @route   GET /api/posts
 * @desc    Get posts with pagination
 * @access  Public
 */
router.get("/", getPostsValidation, postController.getPosts);

/**
 * @route   GET /api/posts/:id
 * @desc    Get a single post by ID
 * @access  Public
 */
router.get("/:id", getPostValidation, postController.getPostById);

/**
 * @route   PUT /api/posts/:id
 * @desc    Update a post
 * @access  Private (author only)
 */
router.put(
  "/:id",
  protect,
  postUpload,
  updatePostValidation,
  postController.updatePost
);

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post
 * @access  Private (author only)
 */
router.delete("/:id", protect, deletePostValidation, postController.deletePost);

module.exports = router;
