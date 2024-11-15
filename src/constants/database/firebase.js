// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDo_SSbz8KPMJz8qcRNO3XlceaBY5qjgNI",
    authDomain: "aim-drez-marketplace.firebaseapp.com",
    projectId: "aim-drez-marketplace",
    storageBucket: "aim-drez-marketplace.firebasestorage.app",
    messagingSenderId: "876345406167",
    appId: "1:876345406167:web:b2e2b31006040aaa7f7692",
    measurementId: "G-BKRJ9K2KZL"
};

const app = initializeApp(firebaseConfig);


// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };