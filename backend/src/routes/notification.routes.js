import { Router } from "express";
import {
  getVapidPublicKey,
  subscribeUser,
  unsubscribeUser,
  getSubscriptionStatus,
  sendTestNotification,
  startTestSeries,
  stopTestSeries,
  getTestSeriesStatus,
} from "../controllers/notification.controller.js";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route to get VAPID public key
router.get("/vapid-key", getVapidPublicKey);

// User protected routes
router.use(verifyJWT);
router.post("/subscribe", subscribeUser);
router.delete("/unsubscribe", unsubscribeUser);
router.get("/subscription-status", getSubscriptionStatus);

// Admin protected test routes
router.post("/test", authorizeAdmin, sendTestNotification);
router.post("/test-series/start", authorizeAdmin, startTestSeries);
router.post("/test-series/stop", authorizeAdmin, stopTestSeries);
router.get("/test-series/status", authorizeAdmin, getTestSeriesStatus);

export default router;
