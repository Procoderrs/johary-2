import Category from "../../models/Category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    // tree builder
   const buildtree = (list, parent = null) => {
  return list
    .filter((cat) => {
      if (parent === null) {
        return cat.parentId === null;
      }

      return cat.parentId?.toString() === parent?.toString();
    })
    .map((cat) => ({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
        image: cat.image ?? null,  // ✅ yeh add karo

      children: buildtree(list, cat._id),
    }));
};

    const tree = buildtree(categories);

    res.json({ success: true, data: tree });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};