import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,  // ensures no duplicates for categories
    },
    subcategories: [{
      type: String,  // Could be Object if more complex subcategory data is needed
      required: true,
    }],
  },
  { timestamps: true }
);

// Create the Category model
export default mongoose.model("Category", categorySchema);

