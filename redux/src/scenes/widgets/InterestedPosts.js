import {Widgetwrap} from '../../components/widgets'
import {Post} from './Post'
import {Box} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {graphql,database} from '../Appwrite/Appwrite'

export let  InterestedPosts=({posts})=>{

  return (
<Box>
{
posts?.map(e=>(
    <Post
    UserId={e.UserId}
Media={e.Media}    
Description={e.Description}
Comments={e.Comments}
Likes={e.Likes}
isProfile={0}
    />
))

}
</Box>

    )
}
