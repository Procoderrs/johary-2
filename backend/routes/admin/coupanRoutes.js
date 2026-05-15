// routes/couponRoutes.js
import express from 'express';
import { validateCoupon, getCoupons, createCoupon, deleteCoupon, toggleCoupon } from "../../controllers/admin/coupanController.js";
import { protect, admin } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post('/validate', validateCoupon); // user
router.get('/', protect, admin, getCoupons); // admin
router.post('/create', protect, admin, createCoupon); // admin
router.delete('/:id', protect, admin, deleteCoupon); // admin
router.put('/:id/toggle', protect, admin, toggleCoupon); // admin

export default router;