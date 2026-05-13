import express from "express";
import {
  createOrder,
  getOrderById,
  payOrder,
  stripeWebhook,
  getMyOrders
} from "../../controllers/user/orderController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);
router.post("/create", createOrder);
router.get("/my-orders", protect, getMyOrders); 
router.get("/:id", getOrderById);               
router.post("/:id/pay", payOrder);

export default router;