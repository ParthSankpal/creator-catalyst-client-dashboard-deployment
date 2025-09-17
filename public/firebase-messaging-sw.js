// firebase-messaging-sw.js

// Give the service worker access to Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
    apiKey: "AIzaSyDu6nj4nGi9IDuNWsPNZOsNVhtDltSyGHY",
    authDomain: "connectpingnetwork.firebaseapp.com",
    projectId: "connectpingnetwork",
    storageBucket: "connectpingnetwork.firebasestorage.app",
    messagingSenderId: "29028461956",
    appId: "1:29028461956:web:cfb871c328aefc2a0241d1",
    measurementId: "G-CRTXGHZ2VP"
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
// messaging.onBackgroundMessage((payload) => {
//     // console.log('[firebase-messaging-sw.js] Received background message:', payload);

//     // Extract notification data
//     const { notification, data } = payload;
    
//     // Customize notification here
//     const notificationTitle = notification?.title || 'Background Message';
//     const notificationOptions = {
//         body: notification?.body || 'You have a new message',
//         icon: notification?.icon || '/firebase-logo.png',
//         // badge: '/firebase-logo.png',
//         // tag: 'firebase-background',
//         // requireInteraction: true,
//         data: data || {},
//         // actions: [
//         //     {
//         //         action: 'open',
//         //         title: 'Open App'
//         //     },
//         //     {
//         //         action: 'close',
//         //         title: 'Close'
//         //     }
//         // ]
//     };

//     // Show the notification
//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
    // // console.log('[firebase-messaging-sw.js] Notification click received.');

    event.notification.close();

    // Handle different actions
    if (event.action === 'close') {
        return;
    }

    // Default action or 'open' action
    const urlToOpen = event.notification.data?.click_action || '/';
    
    // This looks to see if the current window is already open and focuses it
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then((clientList) => {
            // If a window is already open, focus it
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    return client.focus();
                }
            }
            
            // If no window is open, open a new one
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
