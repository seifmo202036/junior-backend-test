import express from "express";

import { login } from "../controllers/authController.js";
import { loginValidation } from "../validators/authValidators.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  login
);

export default router;
