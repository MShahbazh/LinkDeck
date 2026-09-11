import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Layout from './Layout'
import { Login, Main, Sign } from '../components'

export const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
            <Route path='' element={<Main/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='sign' element={<Sign/>}/>
        </Route>
    )
)