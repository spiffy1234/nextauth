import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAQJx6M47uxweu2M5HlPFLfTBSJPm3snSM",
  authDomain: "my-app-867f1.firebaseapp.com",
  projectId: "my-app-867f1",
  storageBucket: "my-app-867f1.appspot.com",
  messagingSenderId: "136434826485",
  appId: "1:136434826485:web:02afc7de0dc6e5517b99bc",
  measurementId: "G-JVTKT6B7EN",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
