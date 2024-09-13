// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Image Upload library


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPI5RiBYSaWIkTPYZ68Isv4R2f3FvppBY",
    authDomain: "landmarket-741a6.firebaseapp.com",
    projectId: "landmarket-741a6",
    storageBucket: "landmarket-741a6.appspot.com",
    messagingSenderId: "1097623677688",
    appId: "1:1097623677688:web:f5d92bd055098af077a90d",
    measurementId: "G-9Q2GRQY2N5"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);