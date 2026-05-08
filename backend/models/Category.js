import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true ,trim:true,},
    slug: { type: String, required: true, unique: true },
parentId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "JoharyCategory",
  default: null,
} ,

 },

  { timestamps: true }
);

const Category = mongoose.model("JoharyCategory", categorySchema);
export default Category;