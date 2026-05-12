import express from "express";
const router = express.Router();

import { createCategory,updateCategory,deleteCategory } from "../../controllers/admin/categoryController.js";
import { admin, protect } from "../../middleware/authMiddleware.js";
import  {uploadCategory, handleCategoryImageUpload } from "../../middleware/uploadCategoryMiddleware.js";

// 🔐 Admin route
router.post("/create",protect,admin,uploadCategory.single("image"), handleCategoryImageUpload, createCategory);
router.put("/:id",protect, admin,uploadCategory.single("image"), handleCategoryImageUpload, updateCategory);
router.delete("/:id",protect, admin,deleteCategory);

export default router;