
import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import Product from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const toggleWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body; // This should be just the product ID

  console.log("Received productId:", productId); // Log to check the ID passed

  // Check if productId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const index = user.wishlist.indexOf(productId);

  if (index > -1) {
    user.wishlist.splice(index, 1); // Remove from wishlist
  } else {
    user.wishlist.push(productId); // Add to wishlist
  }

  await user.save();

  res.status(200).json({ message: "Wishlist updated successfully", wishlist: user.wishlist });
});


export const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate("wishlist");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, user.wishlist, "Wishlist fetched successfully"));
});
