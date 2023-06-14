import { Widgetwrap } from "../../components/widgets";
import {Box, IconButton,Snackbar ,Alert,CircularProgress,Divider,Button,TextField,Skeleton, Typography,useTheme} from '@mui/material';
import { Friend } from "../../components/Friends";
import { FlexBetween } from "../../components/FlexBetween";
import {WhatsappShareButton,WhatsappIcon} from 'react-share'
import {useParams} from 'react-router-dom'

import { ChatBubbleOutline, FavoriteOutlined, ShareOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { useState ,useEffect,useRef} from "react";
import { database,storage } from "../Appwrite/Appwrite";
export let Post=({data,isProfile})=>{
    
    let host=window.location.hostname
    console.log(host)
    let [postDetails,setpostDetails]=useState({});
    let [Loading,setLoading]=useState('');
    let [ImageLoading,setImageLoading]=useState(1);
    let [Share,setShare]=useState('');
let [isLiked,setisLiked]=useState(0);
    useEffect(()=>{
        
        setisLiked(data?.Likes?.includes(localStorage.getItem('unique')))
        setpostDetails({ UserId:data.UserId,
        Description:data.Description,
        Media:data.Media,
        Likes:data.Likes,
        Comments:data.Comments,
        MediaType:data.MediaType
        })
    },[data])
   console.log(data,postDetails)
let {palette}=useTheme()
let main=palette?.neutral?.main;
let neutral=palette?.neutral?.medium;
let primarylight=palette?.primary.light;
let [IsComments,setIsComments]=useState(0)
let [Comment,setComment]=useState('')
let [Media,setMedia]=useState('')
useEffect(()=>{
    
    async function getuserPost(){
        try{
            console.log(data.Media)
        let Media=await storage.getFilePreview(process.env.REACT_APP_Post_Bucket_Id,data.Media)
      
      setMedia(Media.href)
      
      
      setImageLoading(0)
        }
        catch(err){
            console.log(err,'Fetching Image Error in Post')
        }
    }
    getuserPost() 
},[data.Media,postDetails])
// console.log()


 let PostLikes= async ()=>{
   console.log(postDetails)
    
     let currentUser=localStorage.getItem('unique')
         if(isLiked)
         
       postDetails.Likes=postDetails?.Likes.filter(e=>e!==currentUser)
               
       else postDetails.Likes.push(currentUser);
       try{
           setLoading(1)
          let res= await database.updateDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Posts_Collection_Id,data.$id,postDetails);
   
       console.log('Likes Updated')
       
     setisLiked(!isLiked)
     setLoading(0)
       }
       catch(err){console.log(err,'failed in likes')}
        
    }
    

     let PostComment= async ()=>{


       try{
           setLoading(1)
           
          let res= await database.updateDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Posts_Collection_Id,data.$id,postDetails);
       console.log('Comment Updated')
           setpostDetails(postDetails)
       setComment('')

       setLoading(0)
       }
       catch(err){console.log(err,'failed in Comment')}
        
    }
  


    
return (

    <Widgetwrap mt='1rem'>
        
  { !isProfile&&((<Friend UserId={postDetails?.UserId}/>))
}
 
        <Box
        mt='0.5rem'
        >
           <Typography color={main} 
           mt='1rem'
           >

  {postDetails?.Description}
           </Typography>

{
 ImageLoading?  
  <Skeleton
              animation="wave"
              height={40}
              width="100%"
              style={{ marginBottom: 6 }}
            />
 : <img width='100%' src={Media} style={{borderRadius:'0.75rem',marginTop:'0.75rem',p:'0.2rem'}} />
}
    

            </Box>

<FlexBetween>
<FlexBetween gap='1rem'>
<FlexBetween gap='0.3rem'>
<IconButton onClick={()=>{PostLikes()}}>
{
 !isLiked?<FavoriteBorderOutlined/>  : 
    <FavoriteOutlined/>
}
    
</IconButton>

    {postDetails?.Likes?.length}
</FlexBetween>
<FlexBetween gap='0.3rem'>
    <IconButton onClick={()=>setIsComments(!IsComments)}>

    <ChatBubbleOutline/>
    </IconButton>
    {postDetails?.Comments?.length}
</FlexBetween>
            </FlexBetween>
            <IconButton
            
            >
<WhatsappShareButton
title='Check this Post In  SocialNetwork'
url={`${host}/posts/${data.$id}`}
>
<ShareOutlined/>
</WhatsappShareButton>
  
          </IconButton>
</FlexBetween>

{IsComments?( <Box mt='0.5rem'>

   <FlexBetween sx={{mt:'0.5rem',mb:'1rem'}}>
  <TextField id="standard-basic" 
  value={Comment}
  onChange={(e)=>setComment(e.target.value)}
   label="Add Comment" fullWidth sx={{color:main}} variant="standard" />
                     <Button sx={{backgroundColor:primarylight}}
                     onClick={()=>{
                         postDetails.Comments=[...postDetails.Comments,Comment]
                        
                         PostComment()
                     }}
                     >
                     Post 
                     </Button>
                   </FlexBetween>

<Typography color={neutral}>
Comments
</Typography>

           {

            postDetails?.Comments?.map((e,idx)=>(
               <Box key={idx} sx={{mt:"1rem"}}>
                
                <Typography color={main} m='0.5rem 0' pl='0.5rem'>
                   {e}
                </Typography>
                
                <Divider/>

                    </Box>
                    )
            )}
            
            
            </Box>
    ):<Box mt='0.5rem'/>
}
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