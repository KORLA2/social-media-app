import {useParams} from 'react-router-dom'
import {Box,CircularProgress} from '@mui/material'
import {database} from '../Appwrite/Appwrite'
import {Post} from './Post'
import {useEffect,useState} from 'react'
import Navbar from '../navbar/index'
export let ViewSharedPost=()=>{
    let {PostID}=useParams()
    let [Loading,setLoading]=useState(1)
    let [SharedPost,setSharedPost]=useState({});
  useEffect(()=>{
      async function fetchPost(){
       try{   
      let Post_response=await database.getDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Posts_Collection_Id,PostID)
    console.log(Post_response)
      setSharedPost(Post_response)
      setLoading(0)
      }
      catch(err){console.log(err,'single post error')}
      }
      fetchPost()
  },[PostID])

   return (
      <Box>
          <Navbar/>
      
<Box
width='100%'
display='flex'
gap='2rem'
padding='2rem 5%'
justifyContent='center'
>
<Box flexBasis={'26%'}/>
     <Post data={SharedPost} isProfile={0}/>
     <Box flexBasis={'26%'}/>

     </Box>
  
       
     {
    Loading?(
      <Box sx={{position:'fixed',backgroundColor:'rgba(0,0,0,0.5)',top:'0',bottom:'0',left:'0',right:'0'}}>
     <Box sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
          <CircularProgress/>
     </Box>
      </Box>
    ):''
}
</Box>
   )
    
}