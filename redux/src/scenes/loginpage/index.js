import {CircularProgress, Box,useTheme,Typography, Button, TextField,useMediaQuery, IconButton } from "@mui/material"
import {DarkMode,LightMode, EditOutlined ,Facebook,Google,LinkedIn, NavigateBefore} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom'
import {setMode,setcurrentUser} from '../../state/index'
import { useState } from "react";
import load from './social-networking.jpg'
import {account} from '../Appwrite/Appwrite'
import Social from './social-networking.jpg'
import Dropzone from "react-dropzone";
import {useAuth} from './Auth'
import { FlexBetween } from "../../components/FlexBetween";
import {InputBase,Alert} from '@mui/material'
import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Widgetwrap } from "../../components/widgets";
export default function  LoginPage (){
    let {palette}=useTheme();
   let [alert,showAlert]=useState('')
    let background=palette.background.alt
    let nonmobile=useMediaQuery('(min-width:1000px)')
    let neutral=palette?.neutral?.light
let [image,setimage]=useState(0)
let [SignUp,setSignUp]=useState(0)
let [successfulMessage,setsuccesfulMessage]=useState('')
let [user,setUser]=useState({});
let dispatch=useDispatch()
let navigate=useNavigate();
let [ErrorMessage,setErrorMessage]=useState('')
    let primary=palette.primary.light;
let [Loading,setLoading]=useState(0)
let {Registerd,Logined} =useAuth()
let loc= useLocation()

useEffect(()=>{
    
    if(localStorage.getItem('sessionId'))navigate('/home')
},[])

let Login=async (e)=>{
    try{
       setLoading(1)
        
await Logined(user)
let Response=await account.get()
setLoading(0)
console.log(Response)
if(Response.emailVerification)
navigate('/home')

else 
{
    
  setsuccesfulMessage('Check your Mail and Verify your account');
 await account.createVerification(`https://korlagouthamsocialnetwork.netlify.app/verifyaccount`)
    
}

    }
    catch(msg){
        setLoading(0)
        showAlert(1)
        setErrorMessage(msg.message)
        console.log(msg.message)
        console.log(msg)
    }
}


let Register=async (e)=>{
   try{
       setLoading(1)
await Registerd(user,image);
setLoading(0)
setsuccesfulMessage('Registration Succesful Now LogIn to Continue')

   }
   catch(err){
       setLoading(0)
showAlert(1)
        setErrorMessage(err.message)

        console.log(err)
       
   }

}

let isValid= ()=>{
    if(SignUp)
    {
     
    if(!user.Mail|| !user.Password|| !user.Occupation || !image || !user.City ||!user.Name)
  {
  showAlert(1)
        setErrorMessage('Fill All details')
  
  }  
    else Register()
        return;
    }
  else Login()
    
}

let mode=useSelector(state=>state.mode)

return (

  <Box width='100%' height='100%'>
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
display='flex'
gap='0.5rem'
padding='2rem 5%'


sx={{
    backgroundImage:`url(${Social})`,
    backgroundRepeat:'no-repeat',
    backgroundSize:'100% 100%'
}}
justifyContent='space-between'>
{
nonmobile&&(<Box
flexBasis='50%'
>

</Box>)
}

<Box flexBasis={nonmobile?'50%':'100%'}
p='2rem'
m='2rem auto'
borderRadius='1.5rem'
backgroundColor={background}
display='flex'
flexDirection='column'
gap='1.5rem'
>
    {
alert&&(<Alert sx={{mb:'1rem'}} severity="error">{ErrorMessage}</Alert>
)
}
    {
        SignUp?(
            <>


<Box backgroundColor={neutral} p='1rem' >
<TextField placeholder="Email" type='email' label ='Email' required  onChange={(e)=>setUser({...user,Mail:e.target.value}) } sx={{width:'100%',color:primary,
".MuiInputBase-colorPrimary":{
    backgroundColor:neutral
}

}}/>
    </Box>

<Box backgroundColor={neutral} p='1rem' >

<TextField required placeholder="Password" label='Password'  onChange={(e)=>setUser({...user,Password:e.target.value})} type='password' sx={{width:'100%'}}/>
    </Box>

    <Box backgroundColor={neutral} p='1rem' >

<TextField placeholder="Name"  label='Name' required   onChange={(e)=>setUser({...user,Name:e.target.value})} sx={{width:'100%'}}/>
    </Box>
    <Box backgroundColor={neutral} p='1rem' >

<TextField placeholder="City" label='City' required  onChange={(e)=>setUser({...user,City:e.target.value})} sx={{width:'100%'}}/>
    </Box>

    <Box backgroundColor={neutral} p='1rem' >

<TextField placeholder="Occupation"  label='Occupation' required  onChange={(e)=>setUser({...user,Occupation:e.target.value})}  sx={{width:'100%'}}/>
    </Box> 
     <Box backgroundColor={neutral} p='1rem' >

<TextField placeholder="Twitter URL"  label='Twitter Link'   onChange={(e)=>setUser({...user,Twitter:e.target.value})}  sx={{width:'100%'}}/>
    </Box>
     <Box backgroundColor={neutral} p='1rem' >

<TextField placeholder="LinkedIn URL"  label='LinkedIn Link'  onChange={(e)=>setUser({...user,LinkedIn:e.target.value})}  sx={{width:'100%'}}/>
    </Box>
   
    <Box 
p='1rem'
mt='1rem'
borderRadius='5px'

>
<Dropzone
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
            <input {...getInputProps()}  accept='.jpg' />
   {

    image?(<FlexBetween>
        <Typography>
            
            {image.path}
            </Typography>
            <EditOutlined/>
        </FlexBetween>):<p>Add Your Profle Photo </p>
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

onClick={()=>{isValid()}}

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
    
{
  successfulMessage? <Alert severity="success">
      
{successfulMessage}   
  </Alert>:''
    
}

</Box>

</Box>


{
    Loading?(
      <Box sx={{position:'fixed',backgroundColor:'rgba(0,0,0,0.5)',top:'0',bottom:'0',left:'0',right:'0'}}>
     <Box sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
          <CircularProgress/>
     </Box>
      </Box>
    ):''
}

    </Box>

      

    )
}