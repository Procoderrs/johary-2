import Category from "../models/Category.js";

// Create Category (Admin only)
export const createCategory = async (req, res) => {
  const { name, parentId } = req.body;

  try {
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    // Check if category already exists
    const existing = await Category.findOne({ slug });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({
      name,
      slug,
      parent: parentId || null,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories as tree
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    const buildTree = (list, parent = null) =>
      list
        .filter(c => String(c.parent) === String(parent))
        .map(c => ({
          ...c._doc,
          children: buildTree(list, c._id),
        }));

    const tree = buildTree(categories);
    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, parentId } = req.body;

  try {
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug, parent: parentId || null },
      { new: true }
    );

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};