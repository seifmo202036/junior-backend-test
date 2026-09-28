import express from "express";

const router = express.Router();

import { authenticate } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";
import {
  createProductValidation,
  updateProductValidation
} from "../validators/productValidators.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

router.post(
  "/products",
  authenticate,
  requireAdmin,
  createProductValidation,
  handleValidationErrors,
  createProduct
);

router.get("/products", authenticate, getProducts);

router.get("/products/:id", authenticate, getProductById);

router.put(
  "/products/:id",
  authenticate,
  requireAdmin,
  updateProductValidation,
  handleValidationErrors,
  updateProduct
);

router.delete("/products/:id", authenticate, requireAdmin, deleteProduct);

export default router;
