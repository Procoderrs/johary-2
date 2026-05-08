import express from "express";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductBySlug
} from "../../controllers/admin/productController.js";

import { protect, admin } from "../../middleware/authMiddleware.js";
import upload, { handleImageUpload } from "../../middleware/upload.js";

const router = express.Router();

// 🔥 GET ALL PRODUCTS (MUST BE FIRST)
router.get("/", protect, admin, getProducts);

// 🔥 CREATE PRODUCT
router.post("/", protect, admin, upload.array("images", 3), handleImageUpload, createProduct);

// 🔥 SINGLE PRODUCT
router.get("/:slug", protect, admin, getProductBySlug);

// 🔥 UPDATE
router.put("/:slug", protect, admin, upload.array("images", 3), handleImageUpload, updateProduct);

// 🔥 DELETE
router.delete("/:slug", protect, admin, deleteProduct);

export default router;

