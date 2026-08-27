import webpush from "web-push";

const initWebPush = () => {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:admin@upick.com";

  if (!publicKey || !privateKey) {
    console.warn("⚠️ VAPID keys are missing from environment variables. Web push notifications will fail until VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY are set.");
    return false;
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);
  console.log("✅ Web Push (VAPID) configured successfully.");
  return true;
};

export { webpush, initWebPush };
