import FilterOption from "../../models/FilterOption.js";

// ✅ CREATE FILTER OPTION
export const createFilterOption = async (req, res) => {
  try {
    const { type, name } = req.body;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const option = await FilterOption.create({
      type,
      name,
      slug,
    });

    res.status(201).json({
      success: true,
      data: option,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ GET ALL FILTERS (grouped)
export const getFilterOptions = async (req, res) => {
  try {
    const filters = await FilterOption.find();

    // 🔥 group by type
    const grouped = {};

    filters.forEach((f) => {
      if (!grouped[f.type]) {
        grouped[f.type] = [];
      }
      grouped[f.type].push(f);
    });

    res.json({
      success: true,
      data: grouped,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ DELETE FILTER OPTION
export const deleteFilterOption = async (req, res) => {
  try {
    await FilterOption.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};