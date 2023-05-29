
import Navbar from '../navbar/index'
import Widgets from '../widgets/index'
import {database} from '../Appwrite/Appwrite'
import {Box, useMediaQuery} from '@mui/material'
import {ProfilePosts} from './ProfilePosts'
import {useParams} from 'react-router-dom'
import {Friendwidget} from '../widgets/Friendswidget'
import { useEffect, useState } from 'react'
export default function  ProfilePage (){
    let nonmobile=useMediaQuery('(min-width:1000px)')
    let {userID}=useParams()
    let [posts,setposts]=useState([])
    console.log(posts)
    useEffect(()=>{
        async function fetchposts(){
            if(userID){
       try{
           
           let res= await database.getDocument('6470905eda50ef893bdb','6470906723f0b50c18db',userID)
  setposts(res.posts)
        
       }
       catch(err){console.log(err,'failed')}
            
        }
        }
        fetchposts();
        
    },[])
    
return (

    <Box>
<Navbar/>

<Box
width='100%'
display={nonmobile?'flex':'block'}
gap='2rem'
padding='2rem 5%'
justifyContent='center'
>


<Box 
flexBasis={nonmobile?'26%':undefined}
>
   
<Widgets/>
<Box mt='2rem'/>
<Friendwidget/>


    </Box>

<Box 
flexBasis={nonmobile?'42%':undefined}
mt={nonmobile?undefined:'2rem'}
>

{
    posts?.map(e=>
        
  <ProfilePosts postID={e}/>
  
    )
}  
    </Box>
 
</Box>

</Box>
    
    )
}