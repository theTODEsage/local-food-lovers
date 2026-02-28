// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjST6kyCJkJHgu5hiOCHDEhNv-xrANQ8I",
  authDomain: "assignment-10-dceb2.firebaseapp.com",
  projectId: "assignment-10-dceb2",
  storageBucket: "assignment-10-dceb2.firebasestorage.app",
  messagingSenderId: "751441137236",
  appId: "1:751441137236:web:be25da7697b90af6bce7c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);