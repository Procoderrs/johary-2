// controllers/user/productController.js
import Product from "../../models/Product.js";

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true })
      .populate({path:"category",populate:{path:'parentId'}});
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isTrending: true })
      .populate({path:"category",populate:{path:'parentId'}});
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate({path:"category",populate:{path:'parentId'}});
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};