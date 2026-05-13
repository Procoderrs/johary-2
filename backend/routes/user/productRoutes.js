// routes/user/productRoutes.js
import express from "express";
import { getFeaturedProducts, getTrendingProducts, getAllProducts,getProductBySlug } from "../../controllers/user/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/trending", getTrendingProducts);
router.get("/:slug", getProductBySlug); // ✅ yeh add karo


export default router;