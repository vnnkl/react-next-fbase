import Link from 'next/link';
import {useContext} from "react";
import {UserContext} from '../lib/context';

// Components children only shown to authenticated users
export default function AuthCheck(props: { children: any; fallback: any; }) {
    const { username } = useContext(UserContext);

    return username ? props.children : props.fallback || <Link href={'/enter'}>You must be signed in</Link>;
}



