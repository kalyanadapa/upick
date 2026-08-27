import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaBell, FaBellSlash, FaExclamationTriangle } from "react-icons/fa";
import {
  isPushNotificationSupported,
  getCurrentPushSubscription,
  subscribeUserToPush,
  unsubscribeUserFromPush,
} from "../services/notificationService";
import {
  useFetchVapidKeyQuery,
  useSubscribeToPushMutation,
  useUnsubscribeFromPushMutation,
} from "../redux/api/notificationApiSlice";

const NotificationToggle = ({ className = "" }) => {
  const [isSupported, setIsSupported] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState("default");
  const [isLoading, setIsLoading] = useState(false);

  const { data: vapidData } = useFetchVapidKeyQuery();
  const [saveSubscription] = useSubscribeToPushMutation();
  const [deleteSubscription] = useUnsubscribeFromPushMutation();

  useEffect(() => {
    const checkStatus = async () => {
      const supported = isPushNotificationSupported();
      setIsSupported(supported);

      if (supported) {
        setPermission(Notification.permission);
        const sub = await getCurrentPushSubscription();
        setIsSubscribed(!!sub);
      }
    };

    checkStatus();
  }, []);

  const handleToggle = async () => {
    if (!isSupported) {
      toast.error("Push notifications are not supported by your browser.");
      return;
    }

    if (Notification.permission === "denied") {
      toast.error("Notification permission has been blocked in browser settings.");
      setPermission("denied");
      return;
    }

    setIsLoading(true);

    try {
      if (isSubscribed) {
        // Unsubscribe
        const res = await unsubscribeUserFromPush(deleteSubscription);
        if (res) {
          setIsSubscribed(false);
          toast.info("Notifications disabled for this device.");
        }
      } else {
        // Subscribe
        const publicKey = vapidData?.data?.publicKey;
        if (!publicKey) {
          toast.error("Failed to retrieve server encryption keys.");
          setIsLoading(false);
          return;
        }

        await subscribeUserToPush(publicKey, saveSubscription);
        setIsSubscribed(true);
        setPermission(Notification.permission);
        toast.success("🔔 Notifications enabled! You will receive updates from Upick.");
      }
    } catch (err) {
      console.error("[NotificationToggle] Toggle error:", err);
      toast.error(err.message || "Failed to update notification settings.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <div className={`p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 flex items-center gap-3 ${className}`}>
        <FaExclamationTriangle className="text-yellow-500 text-lg" />
        <span className="text-sm">Push notifications are not supported on this device/browser.</span>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${isSubscribed ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"}`}>
            {isSubscribed ? <FaBell className="text-xl animate-bounce" /> : <FaBellSlash className="text-xl" />}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-base">
              Web Push Notifications
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {isSubscribed
                ? "Notifications are active on this device. You will receive updates even in the background."
                : permission === "denied"
                ? "Blocked in browser settings. Please enable notification permissions for Upick."
                : "Receive order updates, price drops, and announcements directly on your device."}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          disabled={isLoading || permission === "denied"}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
            isSubscribed
              ? "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
              : "bg-black hover:bg-gray-800 text-white dark:bg-pink-600 dark:hover:bg-pink-700"
          } ${isLoading || permission === "denied" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isLoading ? (
            <span>Updating...</span>
          ) : isSubscribed ? (
            <>
              <FaBellSlash className="text-sm" /> Disable
            </>
          ) : (
            <>
              <FaBell className="text-sm" /> Enable Notifications
            </>
          )}
        </button>
      </div>

      {permission === "denied" && (
        <div className="mt-3 text-xs text-red-500 bg-red-50 dark:bg-red-950/40 p-2 rounded border border-red-200 dark:border-red-900">
          ⚠️ Notification permissions are currently denied in your browser settings. To enable notifications, click the lock/settings icon near your browser URL bar and allow notifications.
        </div>
      )}
    </div>
  );
};

export default NotificationToggle;
