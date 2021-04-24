import {auth, firestore, increment} from "../lib/firebase";
import {useDocument} from "react-firebase-hooks/firestore";
import {DocumentReference} from "@firebase/firestore-types";


// allows user to heart or like a post
export default function Heart({ postRef } : {postRef: DocumentReference}) {
    //Listen to heart document for currently logged in user
    // @ts-ignore
    const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
    const [heartDoc] = useDocument(heartRef);

    // create a user to post relationship
    const addHeart = async () => {

        // AuthCheck takes care
        // @ts-ignore
        const uid = auth.currentUser.uid;
        const batch = firestore.batch();

        batch.update(postRef, {heartCount: increment(1)});
        batch.set(heartRef, { uid });

        await batch.commit();
    }

    const removeHeart = async () => {
        const batch = firestore.batch();

        batch.update(postRef, {heartCount: increment(-1)});
        batch.delete(heartRef);

        await batch.commit();
    }

    return heartDoc?.exists ? (
        <button onClick={removeHeart}> 💔 Unheart </button>
    ) : (
        <button onClick={addHeart}> ❤️ Heart </button>
    )
}
