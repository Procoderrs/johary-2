import Category from "../../models/Category.js";

// CREATE
export const createCategory = async (req, res) => {
  const { name, parentId } = req.body;

  try {
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const existing = await Category.findOne({ slug });
    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({
      name,
      slug,
      parentId: parentId || null,
      image: req.cloudinaryUrl || "",
    });

    res.status(201).json({
      success: true,
      data: category,  // ✅ tree nahi, category
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
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

    if (req.cloudinaryUrl) {
      category.image = req.cloudinaryUrl;
    }

    await category.save();

    res.json({
      success: true,
      data: category,  // ✅ tree nahi, category
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
const deleteRecursive = async (id) => {
  const children = await Category.find({ parentId: id });
  for (let child of children) {
    await deleteRecursive(child._id);
  }
  await Category.findByIdAndDelete(id);
};

export const deleteCategory = async (req, res) => {
  try {
    await deleteRecursive(req.params.id);
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL (tree)
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();

    const buildTree = (list, parent = null) =>
      list
        .filter(c => {
          if (parent === null) {
            return c.parentId === null || c.parentId === undefined;
          }
          return String(c.parentId) === String(parent);
        })
        .map(c => ({
          _id: c._id,
          name: c.name,
          image: c.image ?? null, 
          slug: c.slug,
          parentId: c.parentId,
          children: buildTree(list, c._id),
        }));

    const tree = buildTree(categories); // ✅ pehle tree bano
    console.log("TREE SAMPLE:", JSON.stringify(tree[0], null, 2)); // ✅ yeh lagao
    console.log("RAW FROM DB:", JSON.stringify(categories[categories.length-1], null, 2));

    res.json({ success: true, data: tree }); // ✅ phir bhejo

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};