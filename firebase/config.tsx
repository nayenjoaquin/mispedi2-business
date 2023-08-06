// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVa1ZgqKt7Ole56l3xj_k0JshuD9LJRLg",
  authDomain: "pedi2-b1bb1.firebaseapp.com",
  projectId: "pedi2-b1bb1",
  storageBucket: "pedi2-b1bb1.appspot.com",
  messagingSenderId: "820466072289",
  appId: "1:820466072289:web:4b3b16a28d80e3edcdd5a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
