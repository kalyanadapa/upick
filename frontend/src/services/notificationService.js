/**
 * Upick Web Push Notification Service
 */

export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const isPushNotificationSupported = () => {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
};

export const getServiceWorkerRegistration = async () => {
  if (!isPushNotificationSupported()) {
    throw new Error('Push notifications are not supported in this browser.');
  }

  let registration = await navigator.serviceWorker.getRegistration();
  if (!registration) {
    console.log('[Push] Registering service worker /sw.js...');
    registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });
  }
  return registration;
};

export const getCurrentPushSubscription = async () => {
  if (!isPushNotificationSupported()) return null;
  try {
    const registration = await getServiceWorkerRegistration();
    return await registration.pushManager.getSubscription();
  } catch (err) {
    console.warn('[Push] Error getting current push subscription:', err);
    return null;
  }
};

export const subscribeUserToPush = async (vapidPublicKey, saveSubscriptionApi) => {
  if (!isPushNotificationSupported()) {
    throw new Error('Push notifications are not supported in this browser.');
  }

  if (!vapidPublicKey) {
    throw new Error('VAPID public key is missing from server.');
  }

  // Check notification permission
  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await Notification.requestPermission();
  }

  if (permission !== 'granted') {
    throw new Error('Notification permission was denied.');
  }

  const registration = await getServiceWorkerRegistration();
  let subscription = await registration.pushManager.getSubscription();

  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });
  }

  const subJson = subscription.toJSON();

  if (saveSubscriptionApi) {
    await saveSubscriptionApi({
      endpoint: subJson.endpoint,
      keys: subJson.keys,
    }).unwrap();
  }

  return subscription;
};

export const unsubscribeUserFromPush = async (deleteSubscriptionApi) => {
  if (!isPushNotificationSupported()) return false;

  const registration = await getServiceWorkerRegistration();
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) {
    const endpoint = subscription.endpoint;
    await subscription.unsubscribe();

    if (deleteSubscriptionApi) {
      try {
        await deleteSubscriptionApi({ endpoint }).unwrap();
      } catch (err) {
        console.warn('[Push] Failed to inform server about unsubscribe:', err);
      }
    }
    return true;
  }
  return false;
};
