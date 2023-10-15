/** @format */
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCw2YaiMxoO5GRQaUdQ0c0SMUn6cXlM2pw",
	authDomain: "test-8223e.firebaseapp.com",
	projectId: "test-8223e",
	storageBucket: "test-8223e.appspot.com",
	messagingSenderId: "729813067345",
	appId: "1:729813067345:web:f0ac1717b5af605bf4ba70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;