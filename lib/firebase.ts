import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDQCjdYHZQd-k-_zJkh-rZEI6MYTct9eYQ",
    authDomain: "react-next-fbase.firebaseapp.com",
    projectId: "react-next-fbase",
    storageBucket: "react-next-fbase.appspot.com",
    messagingSenderId: "1049267149526",
    appId: "1:1049267149526:web:340138c66293299f55c777",
    measurementId: "G-0D3MVLXZRW"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();