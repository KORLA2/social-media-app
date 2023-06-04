
import { AccountTreeOutlined } from '@mui/icons-material'
import {FlexBetween} from './FlexBetween'
import { useTheme,Box,Typography } from '@mui/material'
import { Image } from './image'
import {useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { database } from '../scenes/Appwrite/Appwrite'
export let  Friend=({UserId,isMessage})=>{
let {palette}=useTheme()
let navigate=useNavigate();
    let [User,setUser]=useState({});
let main=palette.neutral?.main;
let medium=palette.neutral?.medium
let primarylight=palette.primary?.light;
useEffect(()=>{
  async function fetchposts(){
   if(UserId){
console.log(UserId)
      
    try{
      let res=  await database.getDocument('6470905eda50ef893bdb','6470906723f0b50c18db',UserId)
        setUser({Name:res.Name,Occupation:res.Occupation})
    }
   
   catch(err){
       console.log(err,'failed')
   }
   }
  }
   fetchposts();  
},[])

return(
    <FlexBetween
    onClick={()=>navigate(isMessage?`/Message/${UserId}`:`/profile/${UserId}`)}
    sx={{
        "&:hover":{
            cursor:'pointer'
            
        }
    }}
    >
    <FlexBetween gap='1rem'>

<Image/>
<Box>
<Typography color={main} fontWeight='500'
sx={{"&:hover":{
    color:medium,
    cursor:'pointer'
}}}
>
{User?.Name}
    </Typography >
    <Typography color={medium} fontSize='0.75rem'>
{User?.Occupation}
    </Typography >
    </Box>
    </FlexBetween>
<AccountTreeOutlined/>
    </FlexBetween>

)

}