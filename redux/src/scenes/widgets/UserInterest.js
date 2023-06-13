import Dropzone from 'react-dropzone'
import {useState} from 'react'
import {storage,database} from  '../Appwrite/Appwrite'
import { InputBase,useTheme,Button,Box ,Typography,Divider, CircularProgress,Alert,useMediaQuery} from '@mui/material'
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
    let [Loading,setLoading]=useState('')
    let dispatch=useDispatch();
    let currentUser=JSON.parse(localStorage.getItem('user'))
let [alert,setalert]=useState(0)

    let postID=  uuid().split('-').join('');
    let nonmobile=useMediaQuery('(min-width:1000px)')
let [data,setdata]=useState({
    UserId:localStorage.getItem('unique'),
   
    Description:'',
    Media:'',
    Likes:[],
     Comments:[],
});
let navigate=useNavigate();
let mediumMain=palette.neutral?.mediumMain;
let medium=palette.neutral?.main;
let background=palette.background?.alt;
let primary=palette.primary?.main;
console.log(currentUser)
let neutral=palette.neutral?.light;

useEffect(()=>{
    
     async function  updateuser(){
        
    try{
        let res=await database.updateDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_User_Collection_Id,localStorage.getItem('unique'),currentUser)
     console.log('success in user data base',res)
    
    // navigate(0)
    }
   catch(err){console.log('failed in user',err)}
    
    }
    updateuser();
},[currentUser.posts])
   


let Post=async()=>{
    
 try{ 
   if(!data.Description||!image) {setalert(1);throw "error";  }
data.Media=postID;
setLoading(1)
  let res= await storage.createFile(process.env.REACT_APP_Post_Bucket_Id,postID,image)
     console.log('success in image',res)
     await database.createDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Posts_Collection_Id,postID,data)
     console.log('success in post data base',res)

dispatch(setPost({post:postID}))
setLoading(0)
     
 }
 catch(err){console.log('failed in image',err)}


}



    return (
        <Widgetwrap>
            {alert?<Alert sx={{mb:'1rem'}} severity="error">'Fill All Details'</Alert>:''}
<FlexBetween

gap='1.5rem'


>
    
    <Image image={currentUser.Media}/>
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
            <input {...getInputProps()} accept= '.jpg' />
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

  <FlexBetween gap='0.11rem'>

<FlexBetween gap='0.25rem'  >
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
<FlexBetween gap='0.25rem'  >
<GifBoxOutlined  color={mediumMain}/>

<Typography
sx={{color:mediumMain,
"&:hover":{
cursor:'pointer',
color:medium
}
}}
>
Attach Video
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
sx={{borderRadius:'3rem'}}
variant='contained'
color='primary'

onClick={Post}
>
    POST

</Button>
    </FlexBetween>
    
{
    Loading?(
      <Box sx={{position:'fixed',backgroundColor:'rgba(0,0,0,0.5)',top:'0',bottom:'0',left:'0',right:'0'}}>
     <Box sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
          <CircularProgress/>
     </Box>
      </Box>
    ):''
}
     </Widgetwrap>
    )
}