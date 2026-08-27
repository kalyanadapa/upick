import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PushSubscription } from "../models/pushSubscription.model.js";
import { webpush, initWebPush } from "../config/push.config.js";

// Ensure webpush is initialized on load
initWebPush();

// Store active test series interval reference in memory
let activeTestSeriesTimer = null;
let testSeriesStepCount = 0;
let testSeriesLogs = [];

/**
 * Get Public VAPID Key for frontend subscription
 */
export const getVapidPublicKey = asyncHandler(async (req, res) => {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  if (!publicKey) {
    throw new ApiError(500, "VAPID public key is not configured on server");
  }
  return res.status(200).json(
    new ApiResponse(200, { publicKey }, "VAPID public key fetched successfully")
  );
});

/**
 * Save / Update Push Subscription
 */
export const subscribeUser = asyncHandler(async (req, res) => {
  const { endpoint, keys } = req.body;

  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    throw new ApiError(400, "Invalid subscription object. Endpoint and keys (p256dh, auth) are required.");
  }

  const userAgent = req.headers["user-agent"] || "";

  // Upsert subscription by endpoint
  const subscription = await PushSubscription.findOneAndUpdate(
    { endpoint },
    {
      user: req.user._id,
      endpoint,
      keys: {
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
      userAgent,
      isActive: true,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`[Push] Subscription registered/updated for user: ${req.user.username} (${subscription._id})`);

  return res.status(200).json(
    new ApiResponse(200, { subscriptionId: subscription._id }, "Push subscription registered successfully")
  );
});

/**
 * Unsubscribe / Deactivate Push Subscription
 */
export const unsubscribeUser = asyncHandler(async (req, res) => {
  const { endpoint } = req.body;

  if (!endpoint) {
    throw new ApiError(400, "Subscription endpoint is required to unsubscribe");
  }

  const subscription = await PushSubscription.findOneAndUpdate(
    { endpoint, user: req.user._id },
    { isActive: false },
    { new: true }
  );

  console.log(`[Push] Subscription deactivated for user: ${req.user.username}`);

  return res.status(200).json(
    new ApiResponse(200, { success: true }, "Push subscription deactivated successfully")
  );
});

/**
 * Check Subscription Status
 */
export const getSubscriptionStatus = asyncHandler(async (req, res) => {
  const { endpoint } = req.query;

  if (!endpoint) {
    return res.status(200).json(
      new ApiResponse(200, { isSubscribed: false }, "No endpoint provided")
    );
  }

  const sub = await PushSubscription.findOne({ endpoint, user: req.user._id, isActive: true });

  return res.status(200).json(
    new ApiResponse(200, { isSubscribed: !!sub }, "Subscription status fetched")
  );
});

/**
 * Helper to dispatch push notification to a list of subscriptions
 */
const sendPushToSubscriptions = async (subscriptions, payload) => {
  let successCount = 0;
  let failureCount = 0;
  let deactivatedCount = 0;

  const payloadString = JSON.stringify({
    title: payload.title || "Upick Notification",
    body: payload.body || "You have a new message from Upick",
    icon: payload.icon || "/icons/icon-192.png",
    badge: payload.badge || "/icons/icon-192.png",
    url: payload.url || "/",
    data: { url: payload.url || "/" }
  });

  const pushPromises = subscriptions.map(async (sub) => {
    const pushSub = {
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.keys.p256dh,
        auth: sub.keys.auth,
      },
    };

    try {
      await webpush.sendNotification(pushSub, payloadString);
      successCount++;
      console.log(`[Push] Notification sent to endpoint: ${sub.endpoint.slice(0, 30)}...`);
    } catch (err) {
      failureCount++;
      console.error(`[Push] Delivery failed for endpoint ${sub.endpoint.slice(0, 30)}... Error: ${err.message}`);
      
      // If subscription expired or invalid (HTTP 404 or 410 Gone)
      if (err.statusCode === 404 || err.statusCode === 410) {
        await PushSubscription.findByIdAndUpdate(sub._id, { isActive: false });
        deactivatedCount++;
        console.log(`[Push] Deactivated invalid/expired subscription: ${sub._id}`);
      }
    }
  });

  await Promise.all(pushPromises);

  return { successCount, failureCount, deactivatedCount };
};

/**
 * Send Single Test Push Notification (Admin Only)
 */
export const sendTestNotification = asyncHandler(async (req, res) => {
  const { title, body, url } = req.body;

  const activeSubscriptions = await PushSubscription.find({ isActive: true });

  if (!activeSubscriptions || activeSubscriptions.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, { totalActive: 0, sent: 0, failed: 0 }, "No active subscriptions found.")
    );
  }

  const result = await sendPushToSubscriptions(activeSubscriptions, {
    title: title || "🏏 Upick Test Notification",
    body: body || "This is a test web push notification from Upick server.",
    url: url || "/",
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalActive: activeSubscriptions.length,
        sent: result.successCount,
        failed: result.failureCount,
        deactivatedExpired: result.deactivatedCount,
      },
      "Test push notification dispatched."
    )
  );
});

/**
 * Start Continuous Test Series (Admin Only - Dev/Test feature)
 */
export const startTestSeries = asyncHandler(async (req, res) => {
  if (activeTestSeriesTimer) {
    return res.status(200).json(
      new ApiResponse(200, { isRunning: true, step: testSeriesStepCount }, "Test series is already running.")
    );
  }

  const sampleNotifications = [
    { title: "🏏 Upick Test #1", body: "India 145/4 — 18.2 overs", url: "/" },
    { title: "🏏 Upick Test #2", body: "India 149/4 — 18.5 overs", url: "/" },
    { title: "🏏 Upick Test #3", body: "WICKET! India 151/5 — 19.1 overs", url: "/" },
    { title: "🏏 Upick Test #4", body: "India 158/5 — 19.6 overs", url: "/" },
    { title: "🏏 Upick Test #5", body: "TARGET REACHED! India wins by 5 wickets 🎉", url: "/" },
  ];

  testSeriesStepCount = 0;
  testSeriesLogs = [];

  const runStep = async () => {
    if (testSeriesStepCount >= sampleNotifications.length) {
      console.log("[Push Test Series] Series completed naturally.");
      clearInterval(activeTestSeriesTimer);
      activeTestSeriesTimer = null;
      testSeriesLogs.push(`Series completed naturally after ${sampleNotifications.length} notifications.`);
      return;
    }

    const payload = sampleNotifications[testSeriesStepCount];
    testSeriesStepCount++;

    const activeSubs = await PushSubscription.find({ isActive: true });
    if (activeSubs.length === 0) {
      console.log("[Push Test Series] No active subscriptions. Stopping series.");
      clearInterval(activeTestSeriesTimer);
      activeTestSeriesTimer = null;
      testSeriesLogs.push("Stopped: No active push subscriptions found.");
      return;
    }

    const result = await sendPushToSubscriptions(activeSubs, payload);
    const logEntry = `[${new Date().toLocaleTimeString()}] Sent Step #${testSeriesStepCount} "${payload.title}": ${result.successCount} succeeded, ${result.failureCount} failed`;
    console.log(`[Push Test Series] ${logEntry}`);
    testSeriesLogs.push(logEntry);
  };

  // Run first step immediately
  await runStep();

  // Schedule subsequent steps every 30 seconds
  activeTestSeriesTimer = setInterval(runStep, 30000);

  return res.status(200).json(
    new ApiResponse(
      200,
      { isRunning: true, step: testSeriesStepCount, totalSteps: sampleNotifications.length },
      "Continuous test notification series started (sending every 30s)."
    )
  );
});

/**
 * Stop Continuous Test Series (Admin Only)
 */
export const stopTestSeries = asyncHandler(async (req, res) => {
  if (activeTestSeriesTimer) {
    clearInterval(activeTestSeriesTimer);
    activeTestSeriesTimer = null;
    testSeriesLogs.push(`Manual stop requested at step ${testSeriesStepCount}.`);
  }

  return res.status(200).json(
    new ApiResponse(200, { isRunning: false, logs: testSeriesLogs }, "Test series stopped.")
  );
});

/**
 * Get Test Series Status (Admin Only)
 */
export const getTestSeriesStatus = asyncHandler(async (req, res) => {
  const activeSubsCount = await PushSubscription.countDocuments({ isActive: true });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        isRunning: !!activeTestSeriesTimer,
        currentStep: testSeriesStepCount,
        activeSubscriptions: activeSubsCount,
        logs: testSeriesLogs,
      },
      "Test series status fetched."
    )
  );
});
