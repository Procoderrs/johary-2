// controllers/admin/variantController.js
import Variant from "../../models/Varients.js";

// CREATE VARIANT TYPE
export const createVariant = async (req, res) => {
  try {
    const variant = await Variant.create(req.body);

    res.json({
      success: true,
      data: variant,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL VARIANTS
export const getVariants = async (req, res) => {
  try {
    const variants = await Variant.find();

    res.json({
      success: true,
      data: variants,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateVariant = async (req, res) => {
  try {
    const updated = await Variant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteVariant = async (req, res) => {
  try {
    await Variant.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};