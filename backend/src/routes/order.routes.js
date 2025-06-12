import express from "express";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";
import {
  getUserOrders,
  getAllOrders,
  getOrderById,getOrderBySessionId,createOrderFromStripeSession
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/user", verifyJWT, getUserOrders);
router.get("/admin", verifyJWT, authorizeAdmin, getAllOrders);
router.get("/:id", verifyJWT, getOrderById);
router.get("/session/:sessionId", getOrderBySessionId);
router.post("/create-from-session", createOrderFromStripeSession);

export default router;
