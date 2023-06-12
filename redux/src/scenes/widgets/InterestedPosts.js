import {Widgetwrap} from '../../components/widgets'
import {Post} from './Post'
import {Box} from '@mui/material'
import {useEffect, useState,useRef} from 'react'
 
export let  InterestedPosts=({posts})=>{

    
    
   
  return (
<Box

>
{
posts?.map((e,idx)=>(
    <Box  
    
    >
    <Post
    key={e.$id}
    idx={idx}
    data={e}
isProfile={0}
    />
    </Box>
))

}
</Box>

    )
}
