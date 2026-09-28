import { body } from "express-validator";

const loginValidation = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .isString()
    .withMessage("Email must be a string")
    .bail()
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
];

export { loginValidation };
