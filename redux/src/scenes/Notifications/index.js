import { Widgetwrap } from "../../components/widgets"
import {Navbar} from '../Navbar/index'
import {Box} from '@mui/material'
import {useEffect} from 'react'
import {client} from '../Appwrite/Appwrite'
export default function Notifications(){
    useEffect(()=>{
        client.subscribe('database.6470905eda50ef893bdb.collection.6478e2c274ce8e6c036f',()=>{
            console.log('Collection Changed')
        })
        
    },[])
    
    
    
    return (
        <Box>
        <Navbar/>
        <Widgetwrap>
            
            
        </Widgetwrap>
    </Box>
    )
    
}