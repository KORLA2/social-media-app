import {FlexBetween} from '../../components/FlexBetween'
import {Widgetwrap} from '../../components/widgets'
import { useTheme,Divider,Box,Typography,Button,useMediaQuery } from "@mui/material";
import { Image } from "../../components/image";
import {database,query} from '../Appwrite/Appwrite'
import {useNavigate,useParams,Link} from 'react-router-dom'
import { useEffect,useState } from 'react';
import {setUser} from '../../state/index'
import {v4 as uuid} from 'uuid'
import { ManageAccounts ,LocationOnOutlined,LinkedIn,EditOutlined,Twitter,WorkOutlineOutlined} from "@mui/icons-material";
import { useSelector,useDispatch } from 'react-redux';
import emailjs from '@emailjs/browser';
export  default function Widgets(){
let {palette}=useTheme()
let dark=palette.background?.dark;    
let primarylight=palette.primary?.light; 
let nonmobile=useMediaQuery('(min-width:1000px)')
let medium=palette.neutral?.medium   
let main=palette.neutral?.main 
let [FriendRequest,setFriendRequest]=useState(0)
let {userID}=useParams()
let user=useSelector((state)=>{
    if(userID)return state.navigatedUser
    return JSON.parse(localStorage.getItem('user'))
});
let currentUser=JSON.parse(localStorage.getItem('user'))
let isFriend=currentUser.Friends?.includes(userID)
async  function sendFollowRequest(){
    
    try{
    let res=await  database.createDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Notification_Collection_Id,uuid(),{Name:currentUser.Name,ToId:userID,FromId:localStorage.getItem('unique'),accepted:'',
    To_Name:user.Name
    })
      console.log(res,'FriendRequest Sent')
emailjs.send('service_xiin6bv','template_gf0vpks',{Mail:user.Mail,To_Name:user.Name,From_Name:currentUser.Name},'jZhaG7It_IP0ii8YF')

}
catch(err){
    console.log(err,'Error in sending Friend Request')
}
}
useEffect(()=>{
   async function isFriendRequestSend(){
     try{
         
         
      let response=await database.listDocuments(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Notification_Collection_Id,[
          query.equal('FromId',localStorage.getItem('unique')),
          query.equal('ToId',userID),
          
          
      ])       
        console.log(response)
        if(response)
        setFriendRequest(1)
     }      
     catch(err){console.log(err,"error while fetching Friend Request Sent or not")}
    }
    isFriendRequestSend()
    
},[])


let navigate=useNavigate();
console.log(user)
return (

        <Widgetwrap >
<FlexBetween gap='0.5rem' pb='1.1rem' onClick={()=>{navigate(`/profile/${userID?userID:localStorage.getItem('unique')}`)
}
}
sx={{

    "&:hover":{
        // color:primarylight,
        cursor:'pointer'
    }
}}

>
    
<FlexBetween gap='1rem'>

<Image image={user?.Media}/>
<Box>

<Typography  
variant='h4'
color={dark}
sx={{

    "&:hover":{
        color:primarylight,
        cursor:'pointer'
    }
}}
fontWeight={500}

>
{user?.Name}
</Typography>
<Typography  color={medium}>
  {user.Friends?.length} Friends
</Typography>

</Box>
</FlexBetween>
<ManageAccounts/>
</FlexBetween> 

<Divider/>

{/* second */}
<Box p='1rem 0'>

<Box display='flex' alignItems='center' gap='1rem' mb='0.5rem' >

<LocationOnOutlined color={medium}/>
<Typography color={main}>
    {user?.City}
</Typography>
    </Box>
    <Box display='flex' alignItems='center' gap='1rem'>
<WorkOutlineOutlined color={medium}/>
<Typography color={main}>

  {user?.Occupation}
</Typography>
        </Box>


</Box>
<Divider/>
        {/* Third */}
        <Box p='1rem 0'>

<Box display='flex' alignItems='center' gap='1rem' justifyContent='space-between' mb='0.5rem' >

<Typography color={main} fontWeight={500}>
    Number of views
</Typography>
<Typography color={main} >
{user?.Views}
</Typography>
    </Box>
    <Box display='flex' alignItems='center' justifyContent='space-between' gap='1rem'>
    <Typography color={main}>

Number of Posts Uploaded 
</Typography>
<Typography color={main}>
{user?.posts?.length}
</Typography>
        </Box>


</Box>
<Divider/>
{/* 4th */}

<Box p='1rem 0'>


<Typography>
    Social Profiles
    </Typography>

{/* twitter */}

<FlexBetween gap='1rem' mb='0.5rem'>

<FlexBetween gap='1rem'>
<Twitter/>
<Box >
    <Link 
   style={{
       textDecoration:'none'
    }}
    
    to={user.Twitter}target='_blank'> 
<Typography color={main}  >
        Twitter
        </Typography><Typography color={main}>

     Social Network
        </Typography>
   </Link>
    </Box>
 </FlexBetween>

<EditOutlined/>
</FlexBetween>

{/* linkedin */}

<FlexBetween gap='1rem' mb='0.5rem'>

<FlexBetween gap='1rem'>
<LinkedIn/>

 <Link 
   style={{
       textDecoration:'none'
    }}
    
    to={user.LinkedIn}target='_blank'> 
<Box >
    
<Typography color={main}>

        LinkedIN
        </Typography> <Typography color={main}>

      Networking Platform
        </Typography>
    </Box>
</Link>
    
 </FlexBetween>

<EditOutlined/>

</FlexBetween>
 </Box>

{
user.Mail!==currentUser.Mail &&(
<FlexBetween>

{
    
!isFriend?

!FriendRequest?<Button variant='outlined'  onClick={()=>{sendFollowRequest();setFriendRequest(1)}}>
    
 Follow
</Button>:
<Button variant='outlined'>
    Request Sent
</Button>
:<Button variant='outlined'>Following</Button>

}
<Button variant='outlined' onClick={()=>navigate(`/Message/${userID}`)}  disabled={!isFriend?1:0}> Message </Button>
    </FlexBetween>
)}
</Widgetwrap>
    )
}

