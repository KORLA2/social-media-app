import Dropzone from 'react-dropzone'
import {useState} from 'react'
import {storage,database} from  '../Appwrite/Appwrite'
import { InputBase,useTheme,Button,Box ,Typography,Divider, useMediaQuery} from '@mui/material'
import {Image} from '../../components/image'
import {FlexBetween} from '../../components/FlexBetween'
import {Widgetwrap} from '../../components/widgets'
import {v4 as uuid} from 'uuid'
import {useNavigate} from 'react-router-dom'
import {setPost} from '../../state/index'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'
import { AttachFileOutlined, EditOutlined,MoreHorizOutlined, GifBoxOutlined, ImageOutlined, MicOutlined } from '@mui/icons-material'
export let UserInterest=()=>{
let [image,setimage]=useState(null);
    let {palette}=useTheme();
    let dispatch=useDispatch();
    let currentUser=useSelector(state=>state.currentUser)
    let postID=  uuid().split('-').join('');
    let nonmobile=useMediaQuery('(min-width:1000px)')
let [data,setdata]=useState({
    UserId:localStorage.getItem('unique'),
    Likes:0,
   
    Description:'',
    Media:postID,
     Comments:[],
});
let navigate=useNavigate();
let mediumMain=palette.neutral?.mediumMain;
let medium=palette.neutral?.main;
let background=palette.background?.alt;
let primary=palette.primary?.main;

let neutral=palette.neutral?.light;
useEffect(()=>{
        
    async function  updateuser(){
    if(currentUser.Mail!==''){
        
    try{
        let res=await database.updateDocument('6470905eda50ef893bdb','6470906723f0b50c18db',localStorage.getItem('unique'),currentUser)
     console.log('success in user data base',res)
    
    }
   catch(err){console.log('failed in user',err)}
    }
    }
    updateuser();
},[currentUser])

let Post=async()=>{
    
 try{ 
  let res= await storage.createFile('6472167a116ba1ed2323',postID,image)
     console.log('success in image',res)
     try{
         
     let res=await database.createDocument('6470905eda50ef893bdb','6471f8d937a5db1db18e',postID,data)
     console.log('success in post data base',res)
    dispatch(setPost({post:postID}))
    

     }
     catch(err){console.log('failed in database',err)}
 }
 catch(err){console.log('failed in image',err)}
  navigate(0)

}



    return (
        <Widgetwrap>
<FlexBetween

gap='1.5rem'


>
    
    <Image/>
    <InputBase 
    sx={{
        p:'1rem 2rem',
        backgroundColor:neutral,
        borderRadius:'2rem',
        width:'100%'
    }}
    onChange={(e)=>{setdata({...data,Description:e.target.value})}}
    placeholder='Whats in your mind ...'
    />
</FlexBetween>
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

<Divider sx={{margin:'1.25rem'}}/>

  <FlexBetween>

<FlexBetween gap='0.25rem' >
<ImageOutlined color={mediumMain}/>

<Typography
sx={{color:mediumMain,
"&:hover":{
cursor:'pointer',
color:medium
}
}}
>
Image
</Typography>

</FlexBetween>
{
nonmobile?(

<>
<FlexBetween gap='0.25rem' >
<AttachFileOutlined  color={mediumMain}/>

<Typography
sx={{color:mediumMain,
"&:hover":{
cursor:'pointer',
color:medium
}
}}
>
Attach File
</Typography>

</FlexBetween>
<FlexBetween gap='0.25rem' >
<GifBoxOutlined  color={mediumMain}/>

<Typography
sx={{color:mediumMain,
"&:hover":{
cursor:'pointer',
color:medium
}
}}
>
Attach Gif
</Typography>

</FlexBetween>
<FlexBetween gap='0.25rem' >
<MicOutlined />

<Typography
sx={{color:mediumMain,
"&:hover":{
cursor:'pointer',
color:medium
}
}}
>
Add Audio
</Typography>

</FlexBetween>
</>

):(<FlexBetween gap='0.25rem'>
    <MoreHorizOutlined/>
</FlexBetween>)
}
<Button
sx={{background:background,color:primary,borderRadius:'3rem'}}
onClick={Post}
>
    POST

</Button>
    </FlexBetween>

            </Widgetwrap>
    )
}