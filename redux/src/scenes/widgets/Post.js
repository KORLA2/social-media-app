import { Widgetwrap } from "../../components/widgets";
import {Box, IconButton, Divider,Button,TextField, Typography,useTheme} from '@mui/material';
import { Friend } from "../../components/Friends";
import image from '../../components/Hero.png'
import { FlexBetween } from "../../components/FlexBetween";
import { ChatBubbleOutline, FavoriteOutlined,FavoriteBorderIcon, ShareOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { useState } from "react";
import { database } from "../Appwrite/Appwrite";
export let Post=({data,isProfile})=>{
    
    let [postDetails,setpostDetails]=useState({
        UserId:data.UserId,
        Description:data.Description,
        Media:data.Media,
        Comments:data.Comments,
        Likes:data.Likes
        
    });
   
let {palette}=useTheme()
let main=palette?.neutral.main;
let primarylight=palette?.primary.light;
let [isLiked,setisLiked]=useState(data?.Likes.includes(localStorage.getItem('unique')))
let [IsComments,setIsComments]=useState(0)
let [Comment,setComment]=useState('')
 let PostLikes= async ()=>{
     let currentUser=localStorage.setItem('unique')
         if(isLiked)
         
       postDetails.Likes=postDetails?.Likes.filter(e=>e!==currentUser)
               
       else postDetails.Likes.push(currentUser);
       try{
          let res= await database.updateDocument('6470905eda50ef893bdb','64760db20226ac09a729',data.$id,postDetails);
       console.log('Likes Updated')
       }
       catch(err){console.log(err,'failed in likes')}
     setisLiked(!isLiked)
        
    }
    

     let PostComment= async ()=>{


       try{
          let res= await database.updateDocument('6470905eda50ef893bdb','64760db20226ac09a729',data.$id,postDetails);
       console.log('Comment Updated')
       }
       catch(err){console.log(err,'failed in Comment')}
        
    }
return (

    <Widgetwrap mt='0.5rem'>
        
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

<img width='100%'  height='auto' src={image} style={{borderRadius:'0.75rem',marginTop:'0.75rem'}}/>
            </Box>

<FlexBetween gap='0.25rem'>
<FlexBetween gap='1rem'>
<FlexBetween gap='0.3rem'>
<IconButton onClick={()=>PostLikes()}>
{
 isLiked?<FavoriteBorderOutlined/>  : 
    <FavoriteOutlined/>
}
    
</IconButton>

    {postDetails?.Likes}
</FlexBetween>
<FlexBetween gap='1rem'>
    <IconButton onClick={()=>setIsComments(!IsComments)}>

    <ChatBubbleOutline/>
    </IconButton>
    {postDetails?.Comments.length}
</FlexBetween>
            </FlexBetween>
            <IconButton>

            <ShareOutlined/>
            </IconButton>
</FlexBetween>

{IsComments?( <Box mt='0.5rem'>

   <FlexBetween>
  <TextField id="standard-basic" 
  onChange={(e)=>setComment(e.target.value)}
   label="Add Comment" fullWidth sx={{color:main}} variant="standard" />
                     <Button sx={{backgroundColor:primarylight}}
                     onClick={()=>{
                         postDetails.Likes=[...postDetails.Likes,Comment]
                         PostComment()
                     }}
                     >
                     Post 
                     </Button>
                   </FlexBetween>

           {

            postDetails?.Comments?.map((e,idx)=>(
               <Box key={idx}>
                
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
        </Widgetwrap>

)



}