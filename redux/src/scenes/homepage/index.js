import Navbar from '../navbar/index'
import Widgets from '../widgets/index'
import {useEffect,useState} from 'react'
import {UserInterest} from '../widgets/UserInterest'
import {Box,CircularProgress, useMediaQuery} from '@mui/material'
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
let [Display,setDisplay]=useState(0)
let navigate=useNavigate()
let [Loading,setLoading]=useState(1)
 let currentUser=JSON.parse(localStorage.getItem('user'))
 console.log(currentUser)
let fetch=async()=>{
try{
let Allposts=await database.listDocuments(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Posts_Collection_Id)
 setLoading(0)
 setposts(Allposts.documents)
}


 catch(err){
     setLoading(0)
        console.log(err)
  
 } 
   

}

let fetchcurrentuser= async()=>{
  try{
      let User_response= await database.getDocument(process.env.REACT_APP_Database_Id,
    process.env.REACT_APP_User_Collection_Id,localStorage.getItem('unique'))
   
   let user={
       Mail:User_response.Mail,
       Password:User_response.Password,
       Name:User_response.Name,
       City:User_response.City,
       Occupation:User_response.Occupation,
       Friends:User_response.Friends,
       posts:User_response.posts,
       Media:User_response.Media,
       Views:User_response.Views,
       Twitter:User_response.Twitter,
       LinkedIn:User_response.LinkedIn,
       
   }
       localStorage.setItem('user',JSON.stringify(user))
  }catch(err){console.log(err,'Error in home page')}
  
}

useEffect(()=>{
  
 if(currentUser.posts)

setDisplay(1)

  fetch()
fetchcurrentuser();
},[])



return (

    Display?(    
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
<Widgets />
    
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
<Advert />
<Box mt='2rem'/>
    <Friendwidget />
    </Box>)
}

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

</Box>):''
    

    )
}