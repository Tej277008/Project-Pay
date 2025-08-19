// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7oGOgeDZpWOdbyP2mQUxaz-kZyVM8ggM",
  authDomain: "ezpos-45ab6.firebaseapp.com",
  projectId: "ezpos-45ab6",
  storageBucket: "ezpos-45ab6.firebasestorage.app",
  messagingSenderId: "68172967136",
  appId: "1:68172967136:web:9392f32e3f87c382267485"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export auth and db so other files can use them
export const auth = getAuth(app);
export const db = getFirestore(app);
