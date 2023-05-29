import {useState,useEffect} from 'react'
import {Post} from '../widgets/Post'
import {database} from '../Appwrite/Appwrite'
export let ProfilePosts=({postID})=>{
    let [post,setpost]=useState('');
    
    console.log(postID)
useEffect(()=>{
    
 async function fetchposts(){
     try{
         
     let res=await database.getDocument('6470905eda50ef893bdb','6471f8d937a5db1db18e',postID,)
     console.log(res)
     setpost(res)
     }
     catch(err){console.log(err,'failed')}
 }
    fetchposts()
    
},[])

    return (<Post Media={post.Media}    
Description={post.Description}
Comments={post.Comments}
Likes={post.Likes} 
isProfile={1} />
    )
}