import {BrowserRouter as Router,Routes,Route,useNavigate} from 'react-router-dom'
import HomePage from './scenes/homepage/index'
import LoginPage from './scenes/loginpage/index'
import ProfilePage from './scenes/profilepage/index'
import Message from './scenes/Message/index'
import Notifications from './scenes/Notifications/index'
import { useState,useEffect } from 'react'
import {useSelector} from 'react-redux'
import {ThemeProvider,CssBaseline} from '@mui/material'
import {createTheme} from '@mui/material/styles'
import themeSettings  from './themes'
export default function App(){
let mode=useSelector(state=>state.mode)
let [Theme,setTheme]=useState('');
useEffect(()=>{

    setTheme(createTheme(themeSettings(mode)))
},[mode])
    let currentUser=localStorage.getItem('cookieFallback')
    
return (

<Router>
    <ThemeProvider theme={Theme}>
<CssBaseline/>
    <Routes>
        <Route path='/' element={ <LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/profile/:userID' element={<ProfilePage/>}/>
        <Route path='/Message/:userID' element={<Message/>}/>
        <Route path='/Notifications' element={<Notifications/>}/>
    </Routes>
    </ThemeProvider>
    </Router>

    )
}