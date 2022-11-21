// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2mFtveQrQH4Y1RyYtlSxYfg_sTH6Un48",
    authDomain: "blog-app-cf4bb.firebaseapp.com",
    projectId: "blog-app-cf4bb",
    storageBucket: "blog-app-cf4bb.appspot.com",
    messagingSenderId: "1046084833148",
    appId: "1:1046084833148:web:c37dddc8212fcc7df41ef9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();