import kebabCase from 'lodash.kebabcase';
import { useCollection } from 'react-firebase-hooks/firestore'
import PostFeed from "../../components/PostFeed";
import {firestore, auth, serverTimestamp} from "../../lib/firebase";
import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {UserContext} from "../../lib/context";
import {inspect} from "util";
import styles from '../../styles/Admin.module.css';
import {toast} from "react-hot-toast";
import AuthCheck from "../../components/Authcheck";

export default function AdminPostsPage( props ) {
  return (
    <main>
        <AuthCheck fallback={''}>
        <h1>Admin posts</h1>
            <PostList/>
            <CreateNewPost/>
        </AuthCheck>
    </main>
  )
}

function PostList() {
    const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
    const query = ref.orderBy('createdAt');
    const [querySnapshot] = useCollection(query);

    const posts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
        <h1>Manage your posts</h1>
        <PostFeed posts={posts} admin />
        </>
    )

}

function CreateNewPost() {

    const router = useRouter();
    const { username } = useContext(UserContext);
    const [title, setTitle] = useState('');

    // ensure slug is url safe
    const  slug = encodeURI(kebabCase(title));

    // Validate Length
    const isValidLength = title.length > 3 && title.length < 100;


    const createPost = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

        const data = {
            title,
            slug,
            uid,
            username,
            published: false,
            content:  '# hello world',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,
        };

        await ref.set(data);

        toast.success('Post created!');

        // Imperative navigation after doc is set
        router.push(`/admin/${slug}`);

    }

    return (
        <form onSubmit={createPost}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'My Awesome Article!'}
                className={styles.input}
            />
            <p>
                <strong>Slug:</strong> {slug}
            </p>
            <button type={"submit"} disabled={!isValidLength} className={'btn-green'}>
                Create New Post
            </button>
        </form>
    );
}