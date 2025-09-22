import { getToken } from "firebase/messaging";
import { CreatorSubscribe } from "../api/notificationApi";
import { messaging } from "./firebase.config";
import { getCookie, setCookie } from "./cookieHandler";

export const generateFirebaseMessageToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    // console.log("🔔 Notification permission:", permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (token) {
        const existingToken = getCookie("fcm_token");

        // ✅ Only call API if token is new
        if (existingToken !== token) {
          setCookie("fcm_token", token, { expires: 7 });
          await CreatorSubscribe(token);
        }
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
