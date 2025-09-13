import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDu6nj4nGi9IDuNWsPNZOsNVhtDltSyGHY",
    authDomain: "connectpingnetwork.firebaseapp.com",
    projectId: "connectpingnetwork",
    storageBucket: "connectpingnetwork.firebasestorage.app",
    messagingSenderId: "29028461956",
    appId: "1:29028461956:web:cfb871c328aefc2a0241d1",
    measurementId: "G-CRTXGHZ2VP"
};

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app);

const generateFirebaseMessageToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);

    if(permission === "granted") {
        const token = await getToken(messaging, {vapidKey: "BJi5vY-cNpiiiVwddAGNWn2EvopHCTZu1WOREQWgg1XIIV71WAC5YSvYCb2OpE_iyui8OwJY2zW1T0zQqSfeUC0"});
        console.log(token);
        return token;
    }
}

export {app, generateFirebaseMessageToken, messaging};