import Stripe from 'stripe';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import { User } from '../models/user.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

 const stripeWebhookHandler = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items.data.price.product'],
    });

    const userId = fullSession.metadata.userId;
    const shippingAddress = JSON.parse(fullSession.metadata.address);
    const lineItems = fullSession.line_items.data;

    const user = await User.findById(userId);
    if (!user) return;

    const orderItems = await Promise.all(
      lineItems.map(async item => {
        const productId = item.price.product.metadata.productId;
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");

        return {
          product: product._id,
          name: product.name,
          images: product.images,
          brand: product.brand,
          price: product.price,
          discountPrice: product.discountPrice,
          quantity: item.quantity,
        };
      })
    );

    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod: 'Stripe',
      paymentResult: {
        id: session.id,
        status: session.payment_status,
        update_time: new Date().toISOString(),
        email_address: user.email,
      },
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: session.amount_total / 100,
      isPaid: true,
      paidAt: new Date(),
    });

    await order.save();

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { countInStock: -item.quantity } },
        { new: true }
      );
    }

    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );
  }

  res.status(200).json({ received: true });
});
export { stripeWebhookHandler };
