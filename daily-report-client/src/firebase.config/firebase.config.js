/** @format */
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGXpgd7OWgugw2waGApsVOV5hJZxHgTbI",
  authDomain: "pids-daily-update.firebaseapp.com",
  projectId: "pids-daily-update",
  storageBucket: "pids-daily-update.appspot.com",
  messagingSenderId: "400498094480",
  appId: "1:400498094480:web:a3a4ff77043fea0c3ac315",
  measurementId: "G-1SD929X3MP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;