import express from "express";
import { stripeWebhookHandler } from "../controllers/payment.controller.js";

const router = express.Router();

// Stripe needs raw body, handled in main file
router.post("/webhook", stripeWebhookHandler);

export default router;
