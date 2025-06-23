const { body, query, param } = require("express-validator");

/**
 * Validation rules for creating a post
 */
const createPostValidation = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Post content is required")
    .isLength({ max: 280 })
    .withMessage("Post content cannot exceed 280 characters"),

  body("visibility")
    .optional()
    .isIn(["public", "followers", "private"])
    .withMessage("Visibility must be public, followers, or private"),
];

/**
 * Validation rules for updating a post
 */
const updatePostValidation = [
  param("id").isMongoId().withMessage("Invalid post ID"),

  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Post content cannot be empty")
    .isLength({ max: 280 })
    .withMessage("Post content cannot exceed 280 characters"),

  body("visibility")
    .optional()
    .isIn(["public", "followers", "private"])
    .withMessage("Visibility must be public, followers, or private"),
];

/**
 * Validation rules for getting posts
 */
const getPostsValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),

  query("authorId").optional().isMongoId().withMessage("Invalid author ID"),

  query("authorUsername")
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Author username must be between 1 and 30 characters"),
];

/**
 * Validation rules for getting a single post
 */
const getPostValidation = [
  param("id").isMongoId().withMessage("Invalid post ID"),
];

/**
 * Validation rules for deleting a post
 */
const deletePostValidation = [
  param("id").isMongoId().withMessage("Invalid post ID"),
];

module.exports = {
  createPostValidation,
  updatePostValidation,
  getPostsValidation,
  getPostValidation,
  deletePostValidation,
};
