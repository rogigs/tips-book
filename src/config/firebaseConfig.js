// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4qEc8eCoLllUcuvuoGGz1U8ovJD0-jhA",
  authDomain: "tips-book.firebaseapp.com",
  projectId: "tips-book",
  storageBucket: "tips-book.appspot.com",
  messagingSenderId: "626577316732",
  appId: "1:626577316732:web:f3de066e3d748cad6d22f9",
  measurementId: "G-K190Y1T4BC",
  databaseURL: "https://tips-book-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
