// routes/user/orderRoutes.js
import express from "express";
import { createOrder, stripeWebhook, getMyOrders } from "../../controllers/user/orderController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Webhook — raw body chahiye Stripe ko
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

router.post("/create", createOrder); // guest bhi order kar sake
router.get("/my-orders", protect, getMyOrders);

export default router;