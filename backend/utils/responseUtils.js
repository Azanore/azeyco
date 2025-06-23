/**
 * Utility functions for consistent API responses
 * Follows DRY principle and our error handling strategy
 */

/**
 * Create an error object with status code
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @returns {Error} Error object with status property
 */
const createError = (message, status = 500) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * Send a successful response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {string} message - Success message
 * @param {Object} data - Response data
 */
const sendSuccessResponse = (
  res,
  statusCode = 200,
  message = "Success",
  data = null
) => {
  const response = {
    success: true,
    message,
    data,
  };

  res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {string} message - Error message
 * @param {Array} errors - Validation errors (optional)
 */
const sendErrorResponse = (
  res,
  statusCode = 500,
  message = "Internal server error",
  errors = null
) => {
  const response = {
    success: false,
    message,
    errors,
  };

  res.status(statusCode).json(response);
};

/**
 * Send validation error response
 * @param {Object} res - Express response object
 * @param {Array} errors - Validation errors from express-validator
 */
const sendValidationError = (res, errors) => {
  sendErrorResponse(res, 400, "Validation failed", errors);
};

/**
 * Send not found error response
 * @param {Object} res - Express response object
 * @param {string} resource - Name of the resource not found
 */
const sendNotFoundError = (res, resource = "Resource") => {
  sendErrorResponse(res, 404, `${resource} not found`);
};

/**
 * Send unauthorized error response
 * @param {Object} res - Express response object
 * @param {string} message - Unauthorized message
 */
const sendUnauthorizedError = (res, message = "Access denied") => {
  sendErrorResponse(res, 401, message);
};

/**
 * Send forbidden error response
 * @param {Object} res - Express response object
 * @param {string} message - Forbidden message
 */
const sendForbiddenError = (res, message = "Forbidden") => {
  sendErrorResponse(res, 403, message);
};

module.exports = {
  createError,
  sendSuccessResponse,
  sendErrorResponse,
  sendValidationError,
  sendNotFoundError,
  sendUnauthorizedError,
  sendForbiddenError,
};
