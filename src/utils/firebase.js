// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfUujOp9vZyrM8C1m1M5hSxLm8cQsQfi8",
    authDomain: "house-listing-e4b84.firebaseapp.com",
    projectId: "house-listing-e4b84",
    storageBucket: "house-listing-e4b84.firebasestorage.app",
    messagingSenderId: "485651564348",
    appId: "1:485651564348:web:b8d0f1ece14137d3928039",
    measurementId: "G-D0EMKNM3ND"
  };

  const app = initializeApp(firebaseConfig);

  // Export Firestore and Storage instances
  export const db = getFirestore(app);
  export const storage = getStorage(app);
