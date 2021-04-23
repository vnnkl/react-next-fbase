import Link from 'next/link';
import {useContext} from "react";
import {UserContext} from '../lib/context';
import {AppPropsType} from "next/dist/next-server/lib/utils";

// Components children only shown to authenticated users
export default function AuthCheck(props) {
    const { username } = useContext(UserContext);

    return username ? props.children : props.fallback || <Link href={'/enter'}>You must be signed in</Link>;
}



