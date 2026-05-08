import express from "express";
import { getAllUsers } from "../../controllers/authController.js";
import { protect, admin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 GET ALL USERS
router.get("/", protect, admin, getAllUsers);

export default router;