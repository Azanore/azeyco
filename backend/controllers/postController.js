const postService = require("../services/postService");
const {
  createSuccessResponse,
  createErrorResponse,
} = require("../utils/responseUtils");

/**
 * Create a new post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createPost = async (req, res) => {
  try {
    const { content, visibility } = req.body;
    const authorId = req.userId;

    // Process uploaded media files
    const media = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        media.push({
          url: `/uploads/posts/${file.filename}`,
          type: "image",
          filename: file.filename,
          size: file.size,
        });
      }
    }

    const postData = {
      content,
      media,
      authorId,
      visibility,
    };

    const post = await postService.createPost(postData);

    res
      .status(201)
      .json(createSuccessResponse("Post created successfully", { post }));
  } catch (error) {
    res.status(error.status || 500).json(createErrorResponse(error.message));
  }
};

/**
 * Get posts with pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPosts = async (req, res) => {
  try {
    const { page, limit, authorId, authorUsername } = req.query;

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      authorId,
      authorUsername,
    };

    const result = await postService.getPosts(options);

    res.json(createSuccessResponse("Posts retrieved successfully", result));
  } catch (error) {
    res.status(error.status || 500).json(createErrorResponse(error.message));
  }
};

/**
 * Get a single post by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);

    res.json(createSuccessResponse("Post retrieved successfully", { post }));
  } catch (error) {
    res.status(error.status || 500).json(createErrorResponse(error.message));
  }
};

/**
 * Update a post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, visibility } = req.body;
    const authorId = req.userId;

    // Process uploaded media files
    const media = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        media.push({
          url: `/uploads/posts/${file.filename}`,
          type: "image",
          filename: file.filename,
          size: file.size,
        });
      }
    }

    const updateData = {
      content,
      media: media.length > 0 ? media : undefined,
      visibility,
    };

    const post = await postService.updatePost(id, authorId, updateData);

    res.json(createSuccessResponse("Post updated successfully", { post }));
  } catch (error) {
    res.status(error.status || 500).json(createErrorResponse(error.message));
  }
};

/**
 * Delete a post
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.userId;

    const result = await postService.deletePost(id, authorId);

    res.json(createSuccessResponse(result.message));
  } catch (error) {
    res.status(error.status || 500).json(createErrorResponse(error.message));
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
