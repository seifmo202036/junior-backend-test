import { body } from "express-validator";

const createProductValidation = [
  body()
    .isObject()
    .withMessage("Request body must be a JSON object"),

  body("name")
    .exists()
    .withMessage("Product name is required")
    .bail()
    .isString()
    .withMessage("Product name must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),

  body("price")
    .exists()
    .withMessage("Price is required")
    .bail()
    .custom((value) => typeof value === "number" || typeof value === "string")
    .withMessage("Price must be a positive number")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("quantity")
    .exists()
    .withMessage("Quantity is required")
    .bail()
    .custom((value) => typeof value === "number" || typeof value === "string")
    .withMessage("Quantity must be a non-negative integer")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer")
];

const updateProductValidation = [
  body()
    .isObject()
    .withMessage("Request body must be a JSON object"),

  body("name")
    .optional()
    .isString()
    .withMessage("Product name must be a string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),

  body("price")
    .optional()
    .custom((value) => typeof value === "number" || typeof value === "string")
    .withMessage("Price must be a positive number")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("quantity")
    .optional()
    .custom((value) => typeof value === "number" || typeof value === "string")
    .withMessage("Quantity must be a non-negative integer")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer")
];

export { createProductValidation, updateProductValidation };
