import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCH9lix6WQTKrKIeLHR_iEBnt1foYT1Zkk",
  authDomain: "olx-clonee.firebaseapp.com",
  databaseURL: "https://olx-clonee.firebaseio.com",
  projectId: "olx-clonee",
  storageBucket: "olx-clonee.appspot.com",
  messagingSenderId: "1047381091746",
  appId: "1:1047381091746:web:daf7b33f9294a831e8fefb",
  measurementId: "G-1Q5DL21TXJ",
};
firebase.initializeApp(config);
export default firebase;

