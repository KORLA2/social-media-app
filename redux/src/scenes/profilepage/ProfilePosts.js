import {useState,useEffect} from 'react'
import {Post} from '../widgets/Post'
import {database} from '../Appwrite/Appwrite'
export let ProfilePosts=({postID})=>{
     
let [post,setpost]=useState('');
    
    console.log(postID)
useEffect(()=>{
    
 async function fetchposts(){
     try{
         
     let res=await database.getDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Posts_Collection_Id,postID)
     console.log(res)
     setpost(res)
     }
     catch(err){console.log(err,'failed')}
 }
 if(postID)
    fetchposts()
    
},[postID])

    return (
    
    <Post 
    data={post}
isProfile={1} />

    )
}