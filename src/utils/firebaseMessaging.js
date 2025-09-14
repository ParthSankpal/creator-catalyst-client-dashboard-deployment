import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseConfig"; 
import { CreatorSubscribe } from "../api/notificationApi";

export const generateFirebaseMessageToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("🔔 Notification permission:", permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (token) {
        console.log("📲 Device Token:", token);

        // ✅ Register device token with backend
        await CreatorSubscribe(token);
      }

      return token;
    } else {
      console.warn("⚠️ Notifications permission not granted");
      return null;
    }
  } catch (err) {
    console.error("❌ Error generating FCM token:", err);
    return null;
  }
};
