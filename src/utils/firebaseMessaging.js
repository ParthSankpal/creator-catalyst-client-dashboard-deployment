import { getToken } from "firebase/messaging";
import { CreatorSubscribe } from "../api/notificationApi";
import { messaging } from "./firebase.config";
import { setCookie } from "./cookieHandler";

export const generateFirebaseMessageToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    // console.log("🔔 Notification permission:", permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (token) {

        setCookie("fcm_token", token, { expires: 7 });
        const dedviceToken = new URLSearchParams();
        dedviceToken.append("token", token);

        // ✅ Register device token with backend
        await CreatorSubscribe(dedviceToken);
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
