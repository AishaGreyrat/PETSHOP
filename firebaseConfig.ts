import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

// se instalo el plugin de uuid para generar id unicas al subir las imagenes a firebase

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/* Estructura proporcionada por firebase */

/* Se agrega el storage para subir archivos a firebase */

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
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export function uploadFile(file: File) { // la variable file se le tuvo que especificar su tipo
  const storageRef = ref(storage, v4())
  uploadBytes(storageRef, file).then(snapshot => {
    console.log(snapshot)
  })
}
