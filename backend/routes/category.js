/* import express from "express";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin protected routes
router.post("/create",protect,admin,uploadCategory.single("image"), handleCategoryImageUpload, createCategory);
router.put("/:id",protect, admin,uploadCategory.single("image"), handleCategoryImageUpload, updateCategory);
router.delete("/:id",protect, admin,deleteCategory);

// Public route to get categories
router.get("/", getCategories);

export default router; */