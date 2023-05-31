import Navbar from '../navbar/index'
import Widgets from '../widgets/index'
import {useEffect,useState} from 'react'
import {UserInterest} from '../widgets/UserInterest'
import {Box, useMediaQuery} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {database} from '../Appwrite/Appwrite'
import {setcurrentUser} from '../../state/index'

import {InterestedPosts} from '../widgets/InterestedPosts'
import {Advert} from '../widgets/Advert'
import {Friendwidget} from '../widgets/Friendswidget'
import { useSelector ,useDispatch} from 'react-redux'
export default function  HomePage (){
let nonmobile=useMediaQuery('(min-width:1000px)')
let [posts,setposts]=useState([]);
let dispatch=useDispatch();
let navigate=useNavigate()
 async function fetchCurrentuser(){
     try{
       
    let res= await database.getDocument('6470905eda50ef893bdb','6470906723f0b50c18db',localStorage.getItem('unique'))
 console.log(res)
  dispatch(setcurrentUser({user:{Mail:res.Mail,Password:res.Password,Name:res.Name,City:res.City,Occupation:res.Occupation,
          Friends:res.Friends,posts:res.posts
          
          }}))
     }catch(err){console.log(err,'failed in home page')}
 }

let fetch=async()=>{

let pro=database.listDocuments('6470905eda50ef893bdb','64760db20226ac09a729')

pro.then(
    function(res){
        
        setposts(res.documents)
    
    },
    
    function(err){
        console.log(err)
    }
)

}
useEffect(()=>{
  
    if(!localStorage.getItem('sessionId'))
    navigate('/')
    else{
        
fetch()
fetchCurrentuser();
    }    
    
},[])



return (
<Box>
<Navbar/>

<Box
width='100%'
display={nonmobile?'flex':'block'}
gap='0.5rem'
padding='2rem 5%'
justifyContent='space-between'
>


<Box 
flexBasis={nonmobile?'26%':undefined}
>
<Widgets  />
    
    </Box>

    <Box 
flexBasis={nonmobile?'42%':undefined}
mt={nonmobile?undefined:'2rem'}
>
<UserInterest/>

    <InterestedPosts posts={posts}/>
    
    </Box>
  {
    nonmobile&&(

    <Box 
flexBasis={nonmobile?'26%':undefined}
>
<Advert/>
<Box mt='2rem'/>
    <Friendwidget />
    </Box>)
}

</Box>

</Box>

    )
}