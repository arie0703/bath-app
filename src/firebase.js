import firebase from 'firebase/app';
import 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu-a-dg9wR2yxYMiwJrP56wu0zcOppdCc",
  authDomain: "nikki-hub.firebaseapp.com",
  projectId: "nikki-hub",
  storageBucket: "nikki-hub.appspot.com",
  messagingSenderId: "340729473304",
  appId: "1:340729473304:web:cca3be9469d7b53eab566d",
  measurementId: "G-69QE2DF68R"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();
