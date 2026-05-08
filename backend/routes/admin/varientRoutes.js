import express from "express";
import {
  createVariant,
  getVariants,
  updateVariant,
  deleteVariant,
} from "../../controllers/admin/varient.js";

import { protect, admin } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, createVariant);
router.get("/", protect, admin, getVariants);
router.put("/:id", protect, admin, updateVariant);
router.delete("/:id", protect, admin, deleteVariant);

export default router;