// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbsC9dkxsQsSs9_Qa_hOLEysOP9E6leXc",
  authDomain: "lost-of-things-ipn.firebaseapp.com",
  projectId: "lost-of-things-ipn",
  storageBucket: "lost-of-things-ipn.firebasestorage.app",
  messagingSenderId: "770075064059",
  appId: "1:770075064059:web:a9e3dd2195e66a7d53225e",
  measurementId: "G-21VG5YXPWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);