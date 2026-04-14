import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAfpXlqCEF7LXT8QlLXWAQZd1LSGU3ZEQ",
  authDomain: "tharaa-12702.firebaseapp.com",
  projectId: "tharaa-12702",
  storageBucket: "tharaa-12702.firebasestorage.app",
  messagingSenderId: "357099840775",
  appId: "1:357099840775:web:90028d2222516b10a7d1a2",
  measurementId: "G-37H0P437T5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
