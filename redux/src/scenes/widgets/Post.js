import { Widgetwrap } from "../../components/widgets";
import {Box, IconButton, CircularProgress,Divider,Button,TextField, Typography,useTheme} from '@mui/material';
import { Friend } from "../../components/Friends";
import { FlexBetween } from "../../components/FlexBetween";
import {PostMedia} from './PostMedia'
import { ChatBubbleOutline, FavoriteOutlined, ShareOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { useState ,useEffect} from "react";
import { database,storage } from "../Appwrite/Appwrite";
export let Post=({data,isProfile})=>{
    
    let [postDetails,setpostDetails]=useState({});
    let [Loading,setLoading]=useState('');
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
            setLoading(1)
        let Media=await storage.getFilePreview('6472167a116ba1ed2323',data.Media)
      
      setMedia(Media.href)
      
      
      setLoading(0)
        }
        catch(err){
            console.log(err,'Fetching Image Error in Post')
        }
    }
    getuserPost() 
},[data.Media,postDetails])

 let PostLikes= async ()=>{
   console.log(postDetails)
    
     let currentUser=localStorage.getItem('unique')
         if(isLiked)
         
       postDetails.Likes=postDetails?.Likes.filter(e=>e!==currentUser)
               
       else postDetails.Likes.push(currentUser);
       try{
           setLoading(1)
          let res= await database.updateDocument('6470905eda50ef893bdb','647f664f4b3d256deac1',data.$id,postDetails);
   
       console.log('Likes Updated')
       
     setisLiked(!isLiked)
     setLoading(0)
       }
       catch(err){console.log(err,'failed in likes')}
        
    }
    

     let PostComment= async ()=>{


       try{
           setLoading(1)
           
          let res= await database.updateDocument('6470905eda50ef893bdb','647f664f4b3d256deac1',data.$id,postDetails);
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


   <img width='100%' src={Media} style={{borderRadius:'0.75rem',marginTop:'0.75rem',p:'0.2rem'}} />
    

            </Box>

<FlexBetween gap='0.25rem'>
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
<FlexBetween gap='1rem'>
    <IconButton onClick={()=>setIsComments(!IsComments)}>

    <ChatBubbleOutline/>
    </IconButton>
    {postDetails?.Comments?.length}
</FlexBetween>
            </FlexBetween>
            <IconButton>

            <ShareOutlined/>
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