import '../styles/globals.css'
import NavBar from "../components/NavBar";
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/context'
import {useUserData} from '../lib/hooks'

function MyApp({ Component, pageProps }) {

    const [user, username] = useUserData();
    return (
    <>
        <UserContext.Provider value={{user, username} }>
            <NavBar/>
            <Component {...pageProps} />
            <Toaster />
        </UserContext.Provider>
    </>
  );
}

export default MyApp
