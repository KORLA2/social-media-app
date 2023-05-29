import { Box,useTheme,Typography, Button, useMediaQuery, IconButton } from "@mui/material"
import {account,database} from '../Appwrite/Appwrite'
import {DarkMode,LightMode, EditOutlined ,Facebook,Google,LinkedIn, NavigateBefore} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom'
import {setMode} from '../../state/index'
import { useState } from "react";
import Dropzone from "react-dropzone";
import { FlexBetween } from "../../components/FlexBetween";
import {InputBase} from '@mui/material'
import {v4 as uuid} from 'uuid'
import { useDispatch, useSelector } from "react-redux";
export default function  LoginPage (){
    let {palette}=useTheme();
    let background=palette.background.alt
    let nonmobile=useMediaQuery('(min-width:1000px)')
    let neutral=palette?.neutral?.light
    let unique=  uuid().split('-').join('')
let [image,setimage]=useState(0)
let [SignUp,setSignUp]=useState(0)
let dispatch=useDispatch()
let navigate=useNavigate();
    let primary=palette.primary.light;
let [user,setuser]=useState({
    Mail:'',
    Password:'',
Name:'',
City:'',
Occupation:'',
})


let Login=async (e)=>{
    try{

         let promise= await account.createEmailSession(user.Mail,user.Password) 

        
          console.log('SUccess',promise)
        
        navigate('/home')
    }
catch(err){
    console.log('failed',err)

}

}




let Register=async (e)=>{
   let promise=database.createDocument(
 
    '6470905eda50ef893bdb',
    '6470906723f0b50c18db',
   unique,
    user
        );

        promise.then(

            function(res){
              console.log(res,user,'successfully created')
          
          
        
let auth=account.create(unique,user.Mail,user.Password)

auth.then(
    function(res){console.log(res,'success in auth')
     localStorage.setItem('unique',unique)
    },
    function(err){console.log(err,'error in auth')},
)
setSignUp(0);

        
        
            },
            function(err){
                console.log('Failed to register',err)
              }
        )




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
        color:primary,

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
flexBasis='50%'
>

    <Typography>
Welcome to Social Network Please Sign IN /Register to Continue
    </Typography>
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
        SignUp?(
            <>

<Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Email" type='email'  onChange={(e)=>setuser({...user,Mail:e.target.value})} sx={{width:'100%'}}/>
    </Box>
    Goutham@5519

<Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Password"  onChange={(e)=>setuser({...user,Password:e.target.value})} type='password' sx={{width:'100%'}}/>
    </Box>

    <Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Name"  onChange={(e)=>setuser({...user,Name:e.target.value})} sx={{width:'100%'}}/>
    </Box>
    <Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="City" onChange={(e)=>setuser({...user,City:e.target.value})} sx={{width:'100%'}}/>
    </Box>

    <Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Occupation" onChange={(e)=>setuser({...user,Occupation:e.target.value})}  sx={{width:'100%'}}/>
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
        </FlexBetween>):<p>Add Image</p>
   }
        
            </Box>
    )
}
    </Dropzone>

    </Box>

        </>):
        <>
                  
<Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Email"  onChange={(e)=>setuser({...user,Mail:e.target.value})} sx={{width:'100%'}}/>
    </Box>
    <Box backgroundColor={neutral} p='1rem' >

<InputBase placeholder="Password" type='password' onChange={(e)=>setuser({...user,Password:e.target.value})}  sx={{width:'100%'}}/>
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
<IconButton>

<Google/>
</IconButton>
<IconButton>

<Facebook/>
</IconButton>

</Box>


</Box>


</Box>



    </Box>

      

    )
}