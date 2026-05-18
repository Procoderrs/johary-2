// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    discount: Number,
    
isFeatured: { type: Boolean, default: false },
isTrending: { type: Boolean, default: false },
soldCount: { type: Number, default: 0 }, 
    stock: {
  type: Number,
  default: 0,
},
rating:{
  type:Number,
  default:0,
  min:0,
  max:5,
},
reviewCount:{
type:Number,
default:0
},
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JoharyCategory",
    },
   
slug: { type: String, unique: true, required: true },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JoharyFilterOption",
    },

    metalType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JoharyFilterOption",
    },

    stoneType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JoharyFilterOption",
    },

    images: [String],

    // ✅ CLEAN VARIANT SYSTEM
    variants: [
      {
        combination: {
          type: Map,   // 👈 dynamic keys (color, size, carat etc)
          of: String,
        },
        price: Number,
        stock: Number,
        sku: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("JoharyProduct", productSchema);