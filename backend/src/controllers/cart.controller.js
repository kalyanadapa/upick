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
            // If product exists, update quantity
            cart.items[existingItemIndex].quantity += quantity;
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