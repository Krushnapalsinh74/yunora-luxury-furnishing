import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAy9tbR-k_GsTMtZJyaoZtnueCVwWFT3Xo",
  authDomain: "educationapp-6ca39.firebaseapp.com",
  databaseURL: "https://educationapp-6ca39-default-rtdb.firebaseio.com",
  projectId: "educationapp-6ca39",
  storageBucket: "educationapp-6ca39.firebasestorage.app",
  messagingSenderId: "975794583507",
  appId: "1:975794583507:web:d371a3d2405abbdde66126",
  measurementId: "G-YEXCP6Z673",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

isSupported().then((supported) => {
  if (supported) getAnalytics(app);
});

export { app };
