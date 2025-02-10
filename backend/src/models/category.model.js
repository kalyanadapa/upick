import mongoose from "mongoose";

// Define the subcategory schema
const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // Optional: Add timestamps if needed
);

// Define the category schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true, // Ensures no duplicates for categories
    },
    subcategories: [subcategorySchema], // Array of subcategory objects
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the Category model
export default mongoose.model("Category", categorySchema);
