const Post = require("../models/Post");
const User = require("../models/User");
const { createError } = require("../utils/responseUtils");

/**
 * Create a new post
 * @param {Object} postData - Post data including content, media, and author info
 * @param {string} postData.content - Post content (max 280 characters)
 * @param {Array} postData.media - Array of media objects
 * @param {string} postData.authorId - Author's user ID
 * @returns {Promise<Object>} Created post with populated author
 */
const createPost = async (postData) => {
  try {
    const { content, media = [], authorId, visibility = "public" } = postData;

    // Validate content
    if (!content || content.trim().length === 0) {
      throw createError("Post content is required", 400);
    }

    if (content.length > 280) {
      throw createError("Post content cannot exceed 280 characters", 400);
    }

    // Get author username
    const author = await User.findById(authorId).select("username");
    if (!author) {
      throw createError("Author not found", 404);
    }

    // Validate media
    if (media.length > 10) {
      throw createError("Maximum 10 media files allowed per post", 400);
    }

    // Create post
    const post = new Post({
      author: authorId,
      authorUsername: author.username,
      content: content.trim(),
      media,
      visibility,
    });

    await post.save();

    // Populate author details for response
    await post.populate("author", "firstName lastName username profilePicture");

    return post;
  } catch (error) {
    if (error.status) throw error;
    throw createError("Failed to create post", 500);
  }
};

/**
 * Get posts with pagination
 * @param {Object} options - Query options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Posts per page (default: 10)
 * @param {string} options.authorId - Filter by author ID
 * @param {string} options.authorUsername - Filter by author username
 * @returns {Promise<Object>} Posts with pagination info
 */
const getPosts = async (options = {}) => {
  try {
    const { page = 1, limit = 10, authorId, authorUsername } = options;
    const skip = (page - 1) * limit;

    // Build query
    const query = { isActive: true, visibility: "public" };

    if (authorId) {
      query.author = authorId;
    }

    if (authorUsername) {
      query.authorUsername = authorUsername;
    }

    // Execute query
    const [posts, total] = await Promise.all([
      Post.find(query)
        .populate("author", "firstName lastName username profilePicture")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore,
      },
    };
  } catch (error) {
    throw createError("Failed to fetch posts", 500);
  }
};

/**
 * Get a single post by ID
 * @param {string} postId - Post ID
 * @returns {Promise<Object>} Post with populated author
 */
const getPostById = async (postId) => {
  try {
    const post = await Post.findOne({ _id: postId, isActive: true }).populate(
      "author",
      "firstName lastName username profilePicture"
    );

    if (!post) {
      throw createError("Post not found", 404);
    }

    return post;
  } catch (error) {
    if (error.status) throw error;
    throw createError("Failed to fetch post", 500);
  }
};

/**
 * Update a post
 * @param {string} postId - Post ID
 * @param {string} authorId - Author's user ID (for authorization)
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated post
 */
const updatePost = async (postId, authorId, updateData) => {
  try {
    const { content, media, visibility } = updateData;

    // Find post and verify ownership
    const post = await Post.findOne({ _id: postId, isActive: true });
    if (!post) {
      throw createError("Post not found", 404);
    }

    if (post.author.toString() !== authorId) {
      throw createError("Unauthorized to update this post", 403);
    }

    // Validate content if provided
    if (content !== undefined) {
      if (!content || content.trim().length === 0) {
        throw createError("Post content is required", 400);
      }
      if (content.length > 280) {
        throw createError("Post content cannot exceed 280 characters", 400);
      }
      post.content = content.trim();
    }

    // Update media if provided (replace existing media)
    if (media !== undefined) {
      if (media.length > 10) {
        throw createError("Maximum 10 media files allowed per post", 400);
      }
      post.media = media;
    }

    // Update visibility if provided
    if (visibility !== undefined) {
      post.visibility = visibility;
    }

    await post.save();
    await post.populate("author", "firstName lastName username profilePicture");

    return post;
  } catch (error) {
    if (error.status) throw error;
    throw createError("Failed to update post", 500);
  }
};

/**
 * Delete a post (soft delete)
 * @param {string} postId - Post ID
 * @param {string} authorId - Author's user ID (for authorization)
 * @returns {Promise<Object>} Success message
 */
const deletePost = async (postId, authorId) => {
  try {
    const post = await Post.findOne({ _id: postId, isActive: true });
    if (!post) {
      throw createError("Post not found", 404);
    }

    if (post.author.toString() !== authorId) {
      throw createError("Unauthorized to delete this post", 403);
    }

    post.isActive = false;
    await post.save();

    return { message: "Post deleted successfully" };
  } catch (error) {
    if (error.status) throw error;
    throw createError("Failed to delete post", 500);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
