// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJmbW69mPS7riJp_4AhJ10NqN8mNGbB0Y",
  authDomain: "emojipass-krishnan005k.firebaseapp.com",
  projectId: "emojipass-krishnan005k",
  storageBucket: "emojipass-krishnan005k.firebasestorage.app", // (typo corrected)
  messagingSenderId: "1027228120601",
  appId: "1:1027228120601:web:56c353dcb1e9171aba5c88",
  measurementId: "G-X01KR690VJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
export const db = getFirestore(app);
