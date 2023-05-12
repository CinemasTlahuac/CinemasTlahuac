// @ts-nocheck
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyAazv4nUxbgswnON1l1x5JG7VsBZcPsEE0",
    authDomain: "cinemastlahuacoficial.firebaseapp.com",
    projectId: "cinemastlahuacoficial",
    storageBucket: "cinemastlahuacoficial.appspot.com",
    messagingSenderId: "773845341205",
    appId: "1:773845341205:web:dc4d99cd063f48f5016a1c",
    measurementId: "G-PH0NHTFBJJ"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveDocument = (coleccion, newFields) => {
    addDoc(collection(db, coleccion), newFields);
}

export const getDocuments = (coleccion) =>
    getDocs(collection(db, coleccion));


export const onGetDocuments = (coleccion, callback) => {
    onSnapshot(collection(db, coleccion, ), callback);
}

export const deleteDocuments = (coleccion, id) =>
    deleteDoc(doc(db, coleccion, id));

export const getDocument = (coleccion, id) => getDoc(doc(db, coleccion, id));

export const updateDocument = (coleccion, id, newFields) => {
    updateDoc(doc(db, coleccion, id), newFields);
}
