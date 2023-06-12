import {Navigate,Outlet} from 'react-router-dom'

export let ProtectedRoutes=()=>{
    
    return localStorage.getItem('sessionId')!==null?<Outlet/>:<Navigate to ='/'/>
    
}