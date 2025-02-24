// import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema;

// const reviewSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// const productSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     // image: { type: String, required: true },
//     images: { type: [String], required: true }, // Array of image URLs
//     brand: {
//       _id: { type: ObjectId, required: true, ref: "Brand" }, // Store brand ID
//       name: { type: String, required: true }, // Store brand name
//     },
//     quantity: { type: Number, required: true },
//     category: { type: ObjectId, ref: "Category", required: true },
//     subcategory: {
//       _id: { type: ObjectId, required: true, ref: "Category.subcategories" },
//       name: { type: String, required: true },
//     },
//     //subcategory: { type: ObjectId, ref: "Category.subcategories", required: true },  
//     description: { type: String, required: true },
//     reviews: [reviewSchema],
//     rating: { type: Number, required: true, default: 0 },
//     numReviews: { type: Number, required: true, default: 0 },
//     price: { type: Number, required: true, default: 0 },
//     countInStock: { type: Number, required: true, default: 0 },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;

import {productTypes} from "../config/ProductTypes.js"
import mongoose from "mongoose";
// import { productTypes } from "../config/ProductTypes";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    images: { type: [String], required: true }, // Array of image URLs
    brand: {
      _id: { type: ObjectId, required: true, ref: "Brand" }, // Store brand ID
      name: { type: String, required: true }, // Store brand name
    },
    quantity: { type: Number, required: true },
    category: { type: ObjectId, ref: "Category", required: true },
    subcategory: {
      _id: { type: ObjectId, required: true, ref: "Category.subcategories" },
      name: { type: String, required: true },
    },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    discountPrice: { type: Number, default: null }, // Now optional
    discountPercentage: { type: Number, required: true, default: 0 }, // Auto-calculated
    countInStock: { type: Number, required: true, default: 0 },
    type: { 
      type: String, 
      required: true, 
      enum: Object.values(productTypes), // Ensures type is one of the predefined types
    },
  },
  { timestamps: true }
);

// 🔹 Middleware to calculate discountPercentage before saving
productSchema.pre("save", function (next) {
  if (!this.discountPrice || this.discountPrice >= this.price) {
    // If discountPrice is not set or is the same as price, no discount
    this.discountPrice = this.price;
    this.discountPercentage = 0;
  } else {
    // Calculate discount percentage only when discount is applied
    this.discountPercentage = Math.round(
      ((this.price - this.discountPrice) / this.price) * 100
    );
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
