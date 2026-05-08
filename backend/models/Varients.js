// models/Variant.js
import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. Color, Size

    options: [
      {
        label: String, // Red
        value: String, // red
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("JoharyVariant", variantSchema);