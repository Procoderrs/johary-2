import express from "express";
import {
  createFilterOption,
  getFilterOptions,
  deleteFilterOption,
} from "../../controllers/admin/filterController.js";

import { protect, admin } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, createFilterOption);
router.get("/", getFilterOptions);
router.delete("/:id", protect, admin, deleteFilterOption);

export default router;