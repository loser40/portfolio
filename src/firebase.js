import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAMvLhtmO4g5nM4j6R6lFA9BsV2YcCZFc",
  authDomain: "protfolio-93474.firebaseapp.com",
  projectId: "protfolio-93474",
  storageBucket: "protfolio-93474.firebasestorage.app",
  messagingSenderId: "1011685043171",
  appId: "1:1011685043171:web:787a9bb4ee5d9862ca8ed6",
  measurementId: "G-CPD9LBBLHP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
