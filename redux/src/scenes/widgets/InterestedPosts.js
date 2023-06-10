import {Widgetwrap} from '../../components/widgets'
import {Post} from './Post'
import {Box} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {graphql,database} from '../Appwrite/Appwrite'
 
export let  InterestedPosts=({posts})=>{
    
    let pathName=window.location.pathname
    console.log(pathName==='/home')
    let {PostID}=useParams()
    useEffect(()=>{
    
      console.log(PostId, document.getElementsByClassName(PostID)[0])
    },[PostID])
    
    
console.log(posts)
  return (
<Box>
{
posts?.map(e=>(
    <Box className={e.$id} >
    <Post
    key={e.$id}
    
    data={e}
isProfile={0}
    />
    </Box>
))

}
</Box>

    )
}
