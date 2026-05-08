import Category from "../../models/Category.js"
// Create Category (Admin only)
export const createCategory = async (req, res) => {
  const { name, parentId } = req.body;

  try {
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const existing = await Category.findOne({ slug });
    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const isParent = !parentId;

    const category = await Category.create({
      name,
      slug,
      parentId: parentId || null,

      
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Category
// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, parentId } = req.body;

  try {
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ success: false, message: "Category not found" });

    if (name) {
      category.name = name;
      category.slug = name.toLowerCase().replace(/\s+/g, "-");
    }

    category.parentId = parentId || null;

    
    await category.save();

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Delete Category
const deleteRecursive = async (id) => {
  const children = await Category.find({ parentId: id });

  for (let child of children) {
    await deleteRecursive(child._id);
  }

  await Category.findByIdAndDelete(id);
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    await deleteRecursive(req.params.id);

    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Get all categories as tree
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();

    const buildTree = (list, parent = null) =>
      list
        .filter(c => String(c.parentId) === String(parent))
        .map(c => ({
          _id: c._id,
          name: c.name,
          parentId: c.parentId,
          children: buildTree(list, c._id),
        }));

    const tree = buildTree(categories);

    console.log("TREE:", JSON.stringify(tree, null, 2));

    res.json(tree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};