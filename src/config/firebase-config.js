
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { get } from "firebase/database";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCcatFSAfug6dlhpjAxmC-ZOdDTtcr1Qng",
  authDomain: "expense-tracker-2dd5a.firebaseapp.com",
  projectId: "expense-tracker-2dd5a",
  storageBucket: "expense-tracker-2dd5a.appspot.com",
  messagingSenderId: "309869477448",
  appId: "1:309869477448:web:baa77f6fc787d34ab7227d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider;
export const db  = getFirestore(app)
