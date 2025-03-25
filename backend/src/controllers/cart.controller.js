import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"
export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;  // Extract productId & quantity
    const userId = req.user._id;  // Get authenticated user ID

    // Validate if product exists
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Find user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        // If cart doesn't exist, create a new one
        cart = new Cart({
            userId,
            items: [{ productId, quantity, price: product.price }],
        });
    } else {
        // Check if product already exists in cart
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex !== -1) {
            // If product exists, send response without updating quantity
            return res.status(200).json(new ApiResponse(200, cart, "Product is already in the cart"));
        } else {
            // If product doesn't exist, add it
            cart.items.push({ productId, quantity, price: product.price });
        }
    }

    // Save updated cart
    await cart.save();

    // Send response using ApiResponse class
    res.status(200).json(new ApiResponse(200, cart, "Product added to cart successfully"));
});

export const getCartProducts = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Get authenticated user ID
    console.log("User ID: ", userId); // Log userId

    try {
        // Find the user's cart using aggregation
        const cartResult = await Cart.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }, // Match by user ID
            },
            {
                $unwind: "$items", // Unwind the items array to work with individual cart items
            },
            {
                $lookup: {
                    from: "products", // The products collection
                    localField: "items.productId", // Match the productId from the cart items
                    foreignField: "_id", // Match it with _id in the products collection
                    as: "productData", // Add populated data in productData
                },
            },
            {
                $unwind: { 
                    path: "$productData", 
                    preserveNullAndEmptyArrays: true, // Preserve nulls if no matching product is found
                },
            },
            {
                $group: {
                    _id: "$_id", // Group by cart ID
                    items: { $push: { 
                        productId: "$items.productId", 
                        quantity: "$items.quantity", 
                        price: "$items.price",
                        productData: "$productData" // Include populated product data
                    }},
                },
            },
        ]);

        console.log("Aggregated Cart: ", cartResult); // Log the aggregated result

        // If cart is empty or not found, return an empty array with a message
        if (!cartResult || cartResult.length === 0 || cartResult[0].items.length === 0) {
            return res.status(200).json(new ApiResponse(200, [], "Cart is empty"));
        }

        // Send response with populated productData
        res.status(200).json(new ApiResponse(200, cartResult[0].items, "Cart products retrieved successfully"));
    } catch (err) {
        console.error("Error fetching cart products: ", err); // Log the error
        return res.status(500).json(new ApiResponse(500, [], "Internal Server Error"));
    }
});
