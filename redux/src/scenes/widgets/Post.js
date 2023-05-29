import { Widgetwrap } from "../../components/widgets";
import {Box, IconButton, Divider,Typography,useTheme} from '@mui/material';
import { Friend } from "../../components/Friends";
import image from '../../components/Hero.png'
import { FlexBetween } from "../../components/FlexBetween";
import { ChatBubbleOutline, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { useState } from "react";
export let Post=({UserId,Comments,Likes,Description,Media,isProfile})=>{
let {palette}=useTheme()
let main=palette.neutral?.main;
console.log(Comments)

let [IsComments,setIsComments]=useState(0)
return (

    <Widgetwrap mt='0.5rem'>
        
  { !isProfile&&((<Friend UserId={UserId}/>))
}

        <Box
        mt='0.5rem'
        >
           <Typography color={main} 
           mt='1rem'
           >

  {Description}
           </Typography>

<img width='100%'  height='auto' src={image} style={{borderRadius:'0.75rem',marginTop:'0.75rem'}}/>
            </Box>

<FlexBetween gap='0.25rem'>
<FlexBetween gap='1rem'>
<FlexBetween gap='0.3rem'>
<IconButton>

    <FavoriteOutlined/>
</IconButton>

    {Likes}
</FlexBetween>
<FlexBetween gap='1rem'>
    <IconButton onClick={()=>setIsComments(!IsComments)}>

    <ChatBubbleOutline/>
    </IconButton>
    {Comments?.length}
</FlexBetween>
            </FlexBetween>
            <IconButton>

            <ShareOutlined/>
            </IconButton>
</FlexBetween>

{IsComments?( <Box mt='0.5rem'>

           {

            Comments?.map((e,idx)=>(
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