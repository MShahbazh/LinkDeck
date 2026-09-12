import { Outlet } from 'react-router-dom';
import { ScrollTop } from '../components';

export default function Layout(){
    return(
        <>
            <ScrollTop/>
            <Outlet/>
        </>
    )
}
