// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfEBNTBOFxRfW1Mp2CaMAEdgEdJ-DR0pE",
    authDomain: "traveltip-3ec28.firebaseapp.com",
    projectId: "traveltip-3ec28",
    storageBucket: "traveltip-3ec28.appspot.com",
    messagingSenderId: "159688272210",
    appId: "1:159688272210:web:8c9895d6474fe4a1f4b28b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(`Firebase initialized ${db}`, db);

export default db;