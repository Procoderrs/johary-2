import express from "express";
const router = express.Router();

import { createCategory,updateCategory,deleteCategory } from "../../controllers/admin/categoryController.js";
import { admin, protect } from "../../middleware/authMiddleware.js";

// 🔐 Admin route
router.post("/create",protect,admin, createCategory);
router.put("/:id",protect, admin,updateCategory);
router.delete("/:id",protect, admin,deleteCategory);

export default router;