import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15', // Leave as-is unless Stripe docs suggest updating
});

export const addToCart = asyncHandler(async (req, res) => {
    const { productId, } = req.body;  // Extract productId & quantity
    const userId = req.user._id;  // Get authenticated user ID
    const quantity=1;
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


export const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Ensure `req.user` is populated
    const { productId } = req.body; // ✅ Get productId from body

    // Validate if productId is passed
    if (!productId) {
        throw new ApiError(400, "Product ID is required");
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    // Ensure that the item exists in the cart before attempting to remove
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
        return res.status(404).json(new ApiResponse(404, cart, "Product not found in cart"));
    }

    // Remove the product from the cart
    cart.items.splice(itemIndex, 1); // Use splice to directly remove item

    await cart.save();

    res.status(200).json(new ApiResponse(200, cart, "Product removed from cart successfully"));
});

export const createStripeCheckoutSession = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const lineItems = cart.items.map((item) => {
      const product = item.productId;

      if (!product || !item.price || typeof item.price !== "number") {
        throw new Error(`Invalid product or price for item: ${item}`);
      }

      // Ensure full image URLs
      const imageUrl = product.images?.[0]?.startsWith("http")
        ? product.images[0]
        : `${process.env.IMAGE_CDN}/${product.images?.[0] || ""}`;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: imageUrl ? [imageUrl] : [],
            metadata: {
              productId: product._id.toString(),
            },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: req.user.email,
      metadata: {
        userId: userId.toString(),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe session creation error:", error.message);
    res.status(500).json({
      message: "Failed to create Stripe checkout session",
      error: error.message,
    });
  }
});

