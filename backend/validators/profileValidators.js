/**
 * Profile Validation Schemas
 */
const { body } = require("express-validator");

const updateProfileValidation = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("First name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name must only contain letters and spaces"),

  body("lastName")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Last name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last name must only contain letters and spaces"),

  body("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
];

module.exports = {
  updateProfileValidation,
};
