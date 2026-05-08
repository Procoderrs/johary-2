import mongoose from "mongoose";

const filterOptionSchema = new mongoose.Schema({
  type: {
    type: String,
   
    enum: [
      "brand",
      "stoneShape",
      "stoneColor",
      "stoneType",
      "metal",
      "carat",
      "price"
    ],
  },

  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
  },
});

const FilterOption = mongoose.model("JoharyFilterOption", filterOptionSchema);
export default FilterOption;