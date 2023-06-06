import { Box,useTheme,Typography, Button, useMediaQuery, IconButton } from "@mui/material"
import {DarkMode,LightMode, EditOutlined ,Facebook,Google,LinkedIn, NavigateBefore} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom'
import {setMode,setcurrentUser} from '../../state/index'
import { useState } from "react";
import {Image} from '../../components/image'
import load from './social-networking.jpg'

import Social from './social-networking.jpg'
import Dropzone from "react-dropzone";
import {useAuth} from './Auth'
import { FlexBetween } from "../../components/FlexBetween";
import {InputBase} from '@mui/material'
import {useEffect} from 'react'

import { useDispatch, useSelector } from "react-redux";
export default function  LoginPage (){
    let {palette}=useTheme();
    let background=palette.background.alt
    let nonmobile=useMediaQuery('(min-width:1000px)')
    let neutral=palette?.neutral?.light
let [image,setimage]=useState(0)
let [SignUp,setSignUp]=useState(0)
let [user,setUser]=useState({});
let dispatch=useDispatch()
let navigate=useNavigate();
    let primary=palette.primary.light;
let [Loading,setLoading]=useState(0)
let currentUser=useSelector(state=>state.currentUser)
let {Registerd,Logined} =useAuth()
useEffect(()=>{
    if(localStorage.getItem('sessionId'))
    navigate('/home')
    
    
    
},[])

let Login=async (e)=>{
    try{
       setLoading(1)
        
await Logined(user)

navigate('/home')
    }
    catch(err){
        console.log(err)
    }
}




let Register=async (e)=>{
   try{
       setLoading(1)
await Registerd(user,image);
setLoading(0)
setSignUp(0)

   }
   catch(err){
        console.log(err)
       
   }

}
let mode=useSelector(state=>state.mode)

return (

   <Box>
    <FlexBetween gap='1rem' alignItems='center'>
<Box/>
<Box
// width='100%'
// p='1rem 6%'
background={background}
textAlign='center'
>
<Typography fontWeight='bold'
fontSize='clamp(1rem,2rem,2.25rem)'
sx={{
    "&:hover":{
        color:palette?.primary?.dark,

        cursor:'pointer'


    }
}}
>
    SocialNetwork
</Typography>

    <Typography>

    Connect with Your friends see what they are sharing
   </Typography>
 

    </Box>
<Box>
<IconButton onClick={()=>{dispatch(setMode())}}>

{
   mode==='dark'?
    <DarkMode
    sx={{fontSize:'25px'}}
    />:<LightMode
    sx={{fontSize:'25px'}}
    
    />
}
    </IconButton>
</Box>

    </FlexBetween>

<Box
width='100%'
display='flex'
justifyContent={nonmobile?'space-between':'center'}
gap='2rem'
p='1.5rem'
>
{
nonmobile&&(<Box
width='50%'
>
<Image image={Social} size={'100%'}/>

    <Typography sx={{textAlign:'center' ,color:palette?.primary?.dark}}>
Welcome to Social Network Please Sign IN /Register to Continue
    </Typography>
</Box>)
}

<Box width={nonmobile?'50%':'100%'}
p='2rem'
m='2rem auto'
borderRadius='1.5rem'
backgroundColor={background}
display='flex'
flexDirection='column'
gap='1.5rem'
>
    {
        SignUp?(
            <>

<Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Email" type='email'  onChange={(e)=>setUser({...user,Mail:e.target.value}) } sx={{width:'100%'}}/>
    </Box>

<Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Password"  onChange={(e)=>setUser({...user,Password:e.target.value})} type='password' sx={{width:'100%'}}/>
    </Box>

    <Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Name"  onChange={(e)=>setUser({...user,Name:e.target.value})} sx={{width:'100%'}}/>
    </Box>
    <Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="City" onChange={(e)=>setUser({...user,City:e.target.value})} sx={{width:'100%'}}/>
    </Box>

    <Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Occupation" onChange={(e)=>setUser({...user,Occupation:e.target.value})}  sx={{width:'100%'}}/>
    </Box>

    <Box 
p='1rem'
mt='1rem'
borderRadius='5px'

>
<Dropzone
acceptedFiles='.jpg'
multiple={true}
onDrop={(accepted)=>
setimage(accepted[0])

}
>

{
    ({getRootProps,getInputProps})=>(
        <Box
        {...getRootProps()}
        p='1rem'
        width='100%'
        sx={{"&:hover":{cursor:'pointer'}}}
        border={`2px dashed ${palette.primary.main}`}
        >
            <input {...getInputProps()} />
   {

    image?(<FlexBetween>
        <Typography>
            
            {image.path}
            </Typography>
            <EditOutlined/>
        </FlexBetween>):<p>Add Your Profle Photo</p>
   }
        
            </Box>
    )
}
    </Dropzone>

    </Box>

        </>):
        <>
                  
<Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Email"  onChange={(e)=>setUser({...user,Mail:e.target.value})} sx={{width:'100%'}}/>
    </Box>
    <Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Password" type='password' onChange={(e)=>setUser({...user,Password:e.target.value})}  sx={{width:'100%'}}/>
    </Box>
        </>
    }


<Box>

<Button variant="contained" backgroundColor={palette.primary.main}
color={palette.primary.alt}
onClick={()=>{SignUp?Register():Login()}}

>
    {SignUp?'SignUp':'SignIn'}

    </Button>
<Typography
onClick={()=>setSignUp(!SignUp)}
sx={{"&:hover":{
    cursor:'pointer',
    color:palette.primary.alt

},
color:palette.primary.main,
textDecoration:'underline',
mt:'1rem'
}}
>
{SignUp?'Already have an Account? Sign IN':'Don\'t have an account ? Sign Up'}

</Typography>

    </Box>
    <Typography>
        OR Sign In with
    </Typography>


<Box
backgroundColor={neutral}
display='flex'
justifyContent='space-around'
p='1.5rem'
>
    
<IconButton >

<Google/>
</IconButton>

<IconButton>

<Facebook/>
</IconButton>

</Box>


</Box>


</Box>

{
    Loading&&(
      <Box sx={{position:'fixed',backgroundColor:'rgba(0,0,0,0.5)',top:'0',bottom:0,left:0,right:0}}>
          <img src={load} alt='noloading'/>  
      </Box>  
    )
}

    </Box>

      

    )
}