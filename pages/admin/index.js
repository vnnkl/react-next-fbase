import Head from 'next/head'
import MetaTags from "../../components/Metatags";
import AuthCheck from "../../components/Authcheck";
import lodash.kebabcase

export default function AdminPostsPage({ props }) {
  return (
    <main>
        <AuthCheck>
        <h1>Admin posts</h1>
            <PostList/>
            <CreateNewPost/>
        </AuthCheck>
    </main>
  )
}

function PostList() {

}

function CreateNewPost() {

}