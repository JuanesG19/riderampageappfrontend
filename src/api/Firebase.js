import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  /* apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID, */
  apiKey: "AIzaSyC0T5gEsuWefV9aTUYlWkBa0mlhxtO2npo",
  authDomain: "riderampageapp.firebaseapp.com",
  projectId: "riderampageapp",
  storageBucket: "riderampageapp.appspot.com",
  messagingSenderId: "859844458108",
  appId: "1:859844458108:web:c1b475a1aad397e0c6fbf9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
