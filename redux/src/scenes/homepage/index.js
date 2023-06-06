import Navbar from '../navbar/index'
import Widgets from '../widgets/index'
import {useEffect,useState} from 'react'
import {UserInterest} from '../widgets/UserInterest'
import {Box, useMediaQuery} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {database} from '../Appwrite/Appwrite'
import {setcurrentUser} from '../../state/index'
import load from '../loginpage/social-networking.jpg'
import {InterestedPosts} from '../widgets/InterestedPosts'
import {Advert} from '../widgets/Advert'
import {Friendwidget} from '../widgets/Friendswidget'
import { useSelector ,useDispatch} from 'react-redux'
export default function  HomePage (){
let nonmobile=useMediaQuery('(min-width:1000px)')
let [posts,setposts]=useState([]);
let dispatch=useDispatch();
let navigate=useNavigate()
let [Loading,setLoading]=useState(1)
 let currentUser=useSelector(state=>state.currentUser)
 console.log(currentUser)
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
  
 
fetch()
  
},[currentUser.posts])

useEffect(()=>{
    
    async function fetchcurrentUser(){
        try{
         let Database_response= await database.getDocument('6470905eda50ef893bdb','6470906723f0b50c18db',localStorage.getItem('unique'))
     console.log(Database_response)
     dispatch(setcurrentUser({user:{   Mail:Database_response.Mail,
    Password:Database_response.Password,
    Name:Database_response.Name,
    City:Database_response.City,
    Occupation:Database_response.Occupation,
    Friends:Database_response.Friends,
    posts:Database_response.posts,
    Media:Database_response.Media}}))
    setLoading(0)
        }
        catch(err){console.log(err,'Error in fetching current User')}
        
    }
    fetchcurrentUser()
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

{
    Loading&&(
      <Box sx={{position:'fixed',backgroundColor:'rgba(0,0,0,0.5)',top:'0',bottom:0,left:0,right:0}}>
          <img src={load} alt='noloading'/>  
      </Box>  
    )
}

</Box>

    )
}