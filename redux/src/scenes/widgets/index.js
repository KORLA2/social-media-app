import {FlexBetween} from '../../components/FlexBetween'
import {Widgetwrap} from '../../components/widgets'
import { useTheme,Divider,Box,Typography,Button } from "@mui/material";
import { Image } from "../../components/image";
import {database} from '../Appwrite/Appwrite'
import {useNavigate,useParams} from 'react-router-dom'
import { useEffect,useState } from 'react';
import {setUser} from '../../state/index'
import {v4 as uuid} from 'uuid'
import { ManageAccounts ,LocationOnOutlined,LinkedIn,EditOutlined,Twitter,WorkOutlineOutlined} from "@mui/icons-material";
import { useSelector,useDispatch } from 'react-redux';
export  default function Widgets(){
let {palette}=useTheme()
let dark=palette.background?.dark;    
let primarylight=palette.primary?.light; 
let medium=palette.neutral?.medium   
let main=palette.neutral?.main 
let {userID}=useParams()
let user=useSelector((state)=>{
    if(userID)return state.navigatedUser
    return state.currentUser
});
let currentUser=useSelector(state=>state.currentUser)

async  function sendFollowRequest(){
    
    try{
    let res=await  database.createDocument('6470905eda50ef893bdb','6478e2c274ce8e6c036f',uuid(),{Name:currentUser.Name,ToId:userID,FromId:localStorage.getItem('unique')})
console.log(res,'FriendRequest Sent')
}
catch(err){
    console.log(err,'Error in sending Friend Request')
}
}

let navigate=useNavigate();
console.log(user)
return (

        <Widgetwrap>
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

<Image />
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
   10 Friends 
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
2345
</Typography>
    </Box>
    <Box display='flex' alignItems='center' justifyContent='space-between' gap='1rem'>
    <Typography color={main}>

Number of Post Impressions
</Typography>
<Typography color={main}>
1234

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
<Box>
<Typography color={main}>
        Twitter
        </Typography><Typography color={main}>

     Social Network
        </Typography>
    </Box>
 </FlexBetween>

<EditOutlined/>
</FlexBetween>

{/* linkedin */}

<FlexBetween gap='1rem' mb='0.5rem'>

<FlexBetween gap='1rem'>
<LinkedIn/>
<Box>
<Typography color={main}>

        LinkedIN
        </Typography> <Typography color={main}>

      Networking Platform
        </Typography>
    </Box>
 </FlexBetween>

<EditOutlined/>
</FlexBetween>
 </Box>

<FlexBetween>
<Button variant='outlined' onClick={sendFollowRequest}>
    Follow
</Button>
<Button>
    Message
</Button>

</FlexBetween>
</Widgetwrap>
    )
}