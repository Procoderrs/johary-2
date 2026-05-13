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

// controllers/user/productController.js mein getAllProducts update karo

export const getAllProducts = async (req, res) => {
  try {
    const {
      category,
      metalType,
      stoneType,
      brand,
      minPrice,
      maxPrice,
      rating,
      sort,
      search,
    } = req.query;

    const query = {};

    // Category filter
    if (category) {
      // Category ID ya slug ho sakta hai
      const cats = category.split(",");
      query.category = { $in: cats };
    }

    // Metal filter
    if (metalType) {
      const metals = metalType.split(",");
      query.metalType = { $in: metals };
    }

    // Stone filter
    if (stoneType) {
      const stones = stoneType.split(",");
      query.stoneType = { $in: stones };
    }

    // Brand filter
    if (brand) {
      const brands = brand.split(",");
      query.brand = { $in: brands };
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Rating filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Search
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Sort
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const products = await Product.find(query)
      .populate({
        path: "category",
        populate: { path: "parentId" }
      })
      .populate("brand")
      .populate("metalType")
      .populate("stoneType")
      .sort(sortOption);

    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate({ path: "category", populate: { path: "parentId" } })
      .populate("brand")
      .populate("metalType")
      .populate("stoneType");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};