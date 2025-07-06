// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-LGrQUvM2qCKPy8odviJ7_XeqiVjwCgU",
  authDomain: "visualmagics-61fc3.firebaseapp.com",
  projectId: "visualmagics-61fc3",
  storageBucket: "visualmagics-61fc3.firebasestorage.app",
  messagingSenderId: "29878383943",
  appId: "1:29878383943:web:c70213c220ee9b17b38862",
  measurementId: "G-4S1H415DN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app; 