importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAQJx6M47uxweu2M5HlPFLfTBSJPm3snSM",
  authDomain: "my-app-867f1.firebaseapp.com",
  projectId: "my-app-867f1",
  storageBucket: "my-app-867f1.appspot.com",
  messagingSenderId: "136434826485",
  appId: "1:136434826485:web:02afc7de0dc6e5517b99bc",
  measurementId: "G-JVTKT6B7EN",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
console.log("_______________________________-kjuij");

messaging.onBackgroundMessage((payload) => {
  console.log("_______________________________-kjuij");
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
