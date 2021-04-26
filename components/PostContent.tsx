import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import {PostType} from '../lib/firebase'
// UI component for main post component
export default function PostContent(wrappedPost: PostType) {

    // it's nested post.post, still a todo
    const post = wrappedPost.post;

    const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

    return (
        <div className="card">
            <h1>{post?.title}</h1>
            <span className="text-sm">
                Written by {'  '}
                <Link href={`/${post.username}/`}>
                    <a className={'text-info'}>@{post.username}</a>
                </Link>{'  '}
                on {(typeof createdAt)=='string' ? createdAt : (createdAt as Date).toISOString()}
            </span>
            <ReactMarkdown>
                {post.content}
            </ReactMarkdown>
        </div>
    )

}