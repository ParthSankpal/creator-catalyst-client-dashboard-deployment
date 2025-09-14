import { getToken } from "firebase/messaging";
import { messaging } from "./firebase.config";

/**
 * ✅ Generate FCM token for this device (client-side only)
 */
export const generateFirebaseMessageToken = async () => {
  if (typeof window === "undefined" || !messaging) return null;

  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      return token;
    }

    return null;
  } catch (error) {
    console.error("Error generating FCM token:", error);
    return null;
  }
};
