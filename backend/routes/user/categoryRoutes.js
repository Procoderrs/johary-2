import express from "express";
const router = express.Router();

import { getCategories } from "../../controllers/user/categoryController.js";

// 🌐 Public route
router.get("/", getCategories);

export default router;