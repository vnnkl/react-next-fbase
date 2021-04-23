import PostFeed from '../../components/PostFeed'
import UserProfile from '../../components/UserProfile'
import {getUserWithUsername, postToJSON} from "../../lib/firebase";


export async function getServerSideProps({query}){
  const { username } = query;

  const userDoc = await getUserWithUsername(username);



  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc){
    user = userDoc.data();

    const postQuery = userDoc.ref.collection('posts').where('published','==',true).orderBy('createdAt','desc').limit(5);

    posts = (await postQuery.get()).docs.map(postToJSON)
  } else {
    return {
      notFound: true,
    };

  }

  return {
    props: {user, posts} // will be passed to component page as props
  }
}

export default function UsernameProfilePage({ user, posts }) {
  return (
    <main>
      <h1>User Profile</h1>
        <UserProfile user={user}/>
        <PostFeed posts={posts}/>
    </main>
  )
}