import Product from "../../models/Product.js";



// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      category,
      brand,
      metalType,
      stoneType,
      stock,
      variants,
    } = req.body;
 const slug = name
      ? name.toLowerCase().replace(/\s+/g, "-")
      : Date.now().toString();
    const parsedVariants = variants ? JSON.parse(variants) : [];

    const product = await Product.create({
      name,
      slug,
      description,
      price,
      discount,
      category,
      brand,
      stock,
      metalType,
      stoneType,
      images: req.cloudinaryUrls || [], // 🔥 FIXED
      variants: parsedVariants,
    });

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.log("PRODUCT CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
// ✅ GET PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category"); // 🔥 FIX

    res.json({ success: true, data: products });
  } catch (err) {
    console.log("GET PRODUCTS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
// ✅ UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      category,
      brand,
      stock,
      metalType,
      stoneType,
      variants,
      existingImages = "[]",   // ✅ frontend se existing images lao
    } = req.body;

    // ── images merge karo (cake app wala pattern) ──
    let oldImages = [];
    try {
      oldImages = JSON.parse(existingImages);
    } catch {
      oldImages = [];
    }
    const newImages = req.cloudinaryUrls || [];
    let finalImages = [...oldImages];
    newImages.forEach((url, i) => {
      finalImages[i] = url;
    });

    const parsedVariants = variants ? JSON.parse(variants) : [];

    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name,
        description,
        price: Number(price || 0),
        discount: Number(discount || 0),
        category,
        brand,
        metalType,
        stock,
        stoneType,
        variants: parsedVariants,
        images: finalImages,    // ✅ merged images
      },
      { new: true }             // ✅ 'after' nahi, 'new' hota hai mongoose mein
    )
    .populate("category")
    .populate("brand")
    .populate("metalType")
    .populate("stoneType");

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE
export const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ slug: req.params.slug });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate("brand")
      .populate("metalType")
      .populate("stoneType");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};