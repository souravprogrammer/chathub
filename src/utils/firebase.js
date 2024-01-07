// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI89kaubLQc1bctWQVjJCVUUxyA5V9ixI",
  authDomain: "omegal-66824.firebaseapp.com",
  projectId: "omegal-66824",
  storageBucket: "omegal-66824.appspot.com",
  messagingSenderId: "966620037827",
  appId: "1:966620037827:web:9312ef5bd3966a45749876",
  measurementId: "G-EHF4BHP1R7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
