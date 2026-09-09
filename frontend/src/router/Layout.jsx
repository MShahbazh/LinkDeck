import {Header,Footer} from '../components/index.js';
import { Outlet } from 'react-router-dom';

export default function Layout(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}
