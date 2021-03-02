import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
	apiKey: "AIzaSyDs0nBvdJQM4cNQtBmQ08ITqGCTfj-pi34",
    authDomain: "twiterclone-e1ca6.firebaseapp.com",
    projectId: "twiterclone-e1ca6",
    storageBucket: "twiterclone-e1ca6.appspot.com",
    messagingSenderId: "1075702421340",
    appId: "1:1075702421340:web:9f74dccba0a3fa366d9399"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();