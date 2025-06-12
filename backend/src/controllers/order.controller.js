import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import Order from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import Cart from "../models/cart.model.js";

export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "_id email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "_id email");
  if (!order) throw new ApiError(404, "Order not found");
  res.json(order);
});

export const getOrderBySessionId = asyncHandler(async (req, res) => {
  const sessionId = req.params.sessionId;

  const order = await Order.findOne({ "paymentResult.id": sessionId });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json(order);
});

export const createOrderFromStripeSession = asyncHandler(async (req, res) => {
  const sessionId = req.body.session_id;
  console.log("Received session ID:", sessionId);

  if (!sessionId) {
    return res.status(400).json({ message: "Missing session_id" });
  }

  // ✅ Check if order already exists for this session
  const existingOrder = await Order.findOne({ "paymentResult.id": sessionId });
  if (existingOrder) {
    console.log("Order already exists for this session");
    return res.status(200).json({ message: "Order already created", order: existingOrder });
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Stripe session retrieved:", session);
  } catch (err) {
    console.error("Stripe session error:", err.message);
    return res.status(500).json({ message: "Stripe error", error: err.message });
  }

  const customerEmail = session.customer_email;
  const user = await User.findOne({ email: customerEmail });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const cart = await Cart.findOne({ userId: user._id })
    .populate("items.productId")
    .populate("items.productId.brand");

  if (!cart || !cart.items.length) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const orderItems = cart.items.map((item) => {
    const product = item.productId;
    const brand = product.brand || {};
    return {
      product: product._id,
      name: product.name,
      images: product.images,
      brand: {
        _id: brand._id || null,
        name: brand.name || "Unknown",
      },
      price: item.price,
      discountPrice: item.discountPrice,
      quantity: item.quantity,
    };
  });

  const totalPrice = orderItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const order = new Order({
    user: user._id,
    orderItems,
    shippingAddress: {
      address: "N/A",
      city: "N/A",
      postalCode: "000000",
      country: "N/A",
    },
    paymentResult: {
      id: sessionId,
      status: session.payment_status,
      email_address: customerEmail,
    },
    totalPrice,
    taxPrice: 0,
    shippingPrice: 0,
    isPaid: true,
    paidAt: new Date(),
  });

  await order.save();

  await Cart.findOneAndDelete({ userId: user._id });

  res.status(201).json(order);
});

