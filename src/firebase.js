import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDM78YbD1x4Zi1fbnwk2onwC45nEQ1bptQ",
  authDomain: "stock-895f6.firebaseapp.com",
  projectId: "stock-895f6",
  storageBucket: "stock-895f6.appspot.com",
  messagingSenderId: "239849211845",
  appId: "1:239849211845:web:3e470a87f01591cd6f2dac",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
