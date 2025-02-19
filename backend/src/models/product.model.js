import mongoose from "mongoose";
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
    // image: { type: String, required: true },
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
    //subcategory: { type: ObjectId, ref: "Category.subcategories", required: true },  
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
