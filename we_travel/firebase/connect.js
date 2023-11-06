// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-N2XZeK4lk7E361a9L0Ar_Qbj8sKu5dA",
  authDomain: "mobile2023-f0f39.firebaseapp.com",
  projectId: "mobile2023-f0f39",
  storageBucket: "mobile2023-f0f39.appspot.com",
  messagingSenderId: "1010001080301",
  appId: "1:1010001080301:web:bac2470de2454423b9c1e4",
  measurementId: "G-Z51NTHHE19",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

