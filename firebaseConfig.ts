import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyBhYZKz4b8d2mdi3GG-_figC-N7NQdEQ3g",
    authDomain: "petshop-4444.firebaseapp.com",
    projectId: "petshop-4444",
    storageBucket: "petshop-4444.appspot.com",
    messagingSenderId: "1085054176297",
    appId: "1:1085054176297:web:53bf2312f3c6cac9cfa038",
    measurementId: "G-3PZKYVV5JZ"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
