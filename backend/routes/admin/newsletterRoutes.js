// routes/newsletterRoutes.js
import express from 'express';
import { subscribe, getSubscribers, sendNewsletterEmail } from '../controllers/newsletterController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.get('/subscribers', protect, admin, getSubscribers);
router.post('/send', protect, admin, sendNewsletterEmail);

export default router;