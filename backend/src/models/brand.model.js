import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    logo: { type: String }, // Optional: Store brand logo URL
    description: { type: String }, // Optional: Store brand description
  },
  { timestamps: true }
);

export default mongoose.model("Brand", brandSchema);
