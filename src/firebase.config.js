// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI3Atwm13eJhS_b9OIBfHc91oMzG6QflQ",
  authDomain: "house-marketplace-app-bfa68.firebaseapp.com",
  projectId: "house-marketplace-app-bfa68",
  storageBucket: "house-marketplace-app-bfa68.appspot.com",
  messagingSenderId: "868452661795",
  appId: "1:868452661795:web:4aaf8bddc450ea6ed38f96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //Not Required?
export const db = getFirestore();
