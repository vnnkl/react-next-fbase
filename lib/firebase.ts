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

export async function getUserWithUsername(username: string) {

    const usersRef = firestore.collection('users');
    const query = usersRef.where('username','==', username).limit(1);
    const userDoc =  (await query.get()).docs[0];
    return userDoc;
}

export function postToJSON(doc){
    const data = doc.data();
    return{
        ...data,
        // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
    }

}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const firestore = firebase.firestore();
export const storage = firebase.storage();