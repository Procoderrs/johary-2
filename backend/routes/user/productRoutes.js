// routes/user/productRoutes.js
import express from "express";
import { getFeaturedProducts, getTrendingProducts, getAllProducts } from "../../controllers/user/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/trending", getTrendingProducts);

export default router;