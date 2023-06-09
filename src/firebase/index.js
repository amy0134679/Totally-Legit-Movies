// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1K27SQO3mRqd_XGByuPtpMhZrvTtDQ_I",
  authDomain: "summative-8a23d.firebaseapp.com",
  projectId: "summative-8a23d",
  storageBucket: "summative-8a23d.appspot.com",
  messagingSenderId: "462845908361",
  appId: "1:462845908361:web:11c0537fb0a5cdf119fd58",
  measurementId: "G-6T6FGS84CH"
};

// Initialize Firebase
const config = initializeApp(firebaseConfig);
export const auth = getAuth(config);
export const firestore = getFirestore(config);