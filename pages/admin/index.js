import Head from 'next/head'
import MetaTags from "../../components/Metatags";
import AuthCheck from "../../components/Authcheck";


export default function AdminPostsPage({ props }) {
  return (
    <main>
        <AuthCheck>
        <MetaTags title={'admin page'} />
        <h1>Admin posts</h1>
        </AuthCheck>
    </main>
  )
}