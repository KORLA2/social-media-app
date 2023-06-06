
import Navbar from '../navbar/index'
import Widgets from '../widgets/index'
import {database} from '../Appwrite/Appwrite'
import {Box, useMediaQuery} from '@mui/material'
import {ProfilePosts} from './ProfilePosts'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {setnavigatedUser} from '../../state/index'
import {Friendwidget} from '../widgets/Friendswidget'
import { useEffect, useState } from 'react'
export default function  ProfilePage (){
    let nonmobile=useMediaQuery('(min-width:1000px)')
    let {userID}=useParams()
    let  navigate=useNavigate()
    let  dispatch=useDispatch()
    let navigateduser=useSelector(state=>state.navigatedUser)
    let user=useSelector(state=>state.currentUser)
    console.log(user)
    useEffect(()=>{
          
        async function fetchposts(){
          
       
                
       try{
           let res=await database.getDocument('6470905eda50ef893bdb','6470906723f0b50c18db',userID)
          dispatch(setnavigatedUser({user:{Mail:res.Mail,Password:res.Password,Name:res.Name,City:res.City,Occupation:res.Occupation,
          Friends:res.Friends,posts:res.posts,Media:res.Media
     
          }}))
        //   navigate(0)
       }
       catch(err){console.log(err,'failed')}
            
        }
        
        fetchposts();
        
    },[userID])
    
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
   
<Widgets />
<Box mt='2rem'/>
<Friendwidget />


    </Box>

<Box 
flexBasis={nonmobile?'42%':undefined}
mt={nonmobile?undefined:'2rem'}
>


        {
            
         navigateduser?.posts?.map(e=>
             
  <ProfilePosts postID={e}/>
             
         )   
        }
    
    </Box>
 
</Box>

</Box>
    
    )
}