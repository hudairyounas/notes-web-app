// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdECAlrMTUwixcFvdpqkcm8zjOB72LAq4",
  authDomain: "noteapp-9c575.firebaseapp.com",
  projectId: "noteapp-9c575",
  storageBucket: "noteapp-9c575.firebasestorage.app",
  messagingSenderId: "699482861855",
  appId: "1:699482861855:web:62d20f8ff59f14aa1d802a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
