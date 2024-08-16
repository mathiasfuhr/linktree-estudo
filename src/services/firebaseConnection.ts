// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

{
  /*import os modelos der autenticação e o dabase do firebase*/
}
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg5E0vNCAFmldwiF_r5YT3X3QHr6YH4RE",
  authDomain: "reactlinks-8e976.firebaseapp.com",
  projectId: "reactlinks-8e976",
  storageBucket: "reactlinks-8e976.appspot.com",
  messagingSenderId: "882081825146",
  appId: "1:882081825146:web:e37bdc480b720533a396c3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
