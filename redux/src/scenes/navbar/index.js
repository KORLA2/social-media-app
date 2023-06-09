import { IconButton,InputBase,Typography ,Box,useTheme,CircularProgress,useMediaQuery, MenuItem,Divider,FormControl, Select} from "@mui/material";
import {FlexBetween} from '../../components/FlexBetween'
import {Close, DarkMode,Menu, Help, LightMode, Message, Notifications, Search, SentimentNeutralOutlined} from '@mui/icons-material'
import {setMode,setdummyUser} from '../../state/index'
import {useSelector,useDispatch} from 'react-redux'
import { useState } from "react";
import {Friend} from '../../components/Friends'

import {account, database,query} from '../Appwrite/Appwrite';
import { useNavigate } from "react-router-dom";
import { Widgetwrap } from "../../components/widgets";
export default function Navbar(){

    let theme=useTheme();
    let dispatch=useDispatch()
    let [toggle,setToggle] =useState(false)
    let color=useSelector(state=>state.mode)
    let nonmobile=useMediaQuery('(min-width:1000px)')
    let alt=theme.palette.background?.alt;
    let  dark=theme.palette.neutral?.dark;
    let navigate=useNavigate()
    let background=theme.palette.background.default;
    let primary=theme.palette.primary.dark;
    let neutral=theme.palette?.neutral?.light
    let currentUser=JSON.parse(localStorage.getItem('user'))
console.log(currentUser)

const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  let [Loading,setLoading]=useState(0)
  const handleClose = () => setOpen(false);
  let [SuggestedUsers,setSuggestedUsers]=useState([]);
async function LogOut(){
    try{
        setLoading(1)
        let res=await account.get()
        console.log(res)
      await  account.deleteSession(localStorage.getItem('sessionId'))
      localStorage.removeItem('sessionId')
    // dispatch()
      navigate('/')
    }
    catch(err){console.log(err,'Error In LogOut')}
    
}
async function Suggested(e){
   try{
    console.log(e.target.value)
       
   let res=await  database.listDocuments('6470905eda50ef893bdb','6470906723f0b50c18db',
    
[query.search('Name',e.target.value)
   ]   )
    setSuggestedUsers(res.documents)
   }
   catch(err){console.log(err)}
}

return (

    <FlexBetween pading='2rem 6%' backgroundColor={alt} >
        <FlexBetween  gap='1.75rem'>
<Typography fontWeight='bold'
fontSize='clamp(1rem,2rem,2.25rem)'
sx={{
    "&:hover":{
        color:primary,

        cursor:'pointer'


    }
}}
>
    SocialNetwork
</Typography>
{
    nonmobile&&(
<Box>
   <FlexBetween
   backgroundColor= {neutral}
gap='3rem'
padding='0.1rem 1.5rem'
onClick={handleOpen}
   >
    <InputBase placeholder='Search...' onChange={Suggested}/>
    <IconButton>
        <Search/>
        </IconButton>
    </FlexBetween>
    
    {
        open&&(
            <Box
onClick={handleClose}
            
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{position:'fixed' ,top:'10%',left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.5)',zIndex:3}}
      >
        <Widgetwrap sx={{width:400,position:'absolute',left:'15%',top:'0%'}} >
          {
              SuggestedUsers?.map(e=>
                  <Box display='flex' flexDirection='column' gap='0.5rem'>
                  <Friend UserId={e.$id} isMessage={0}/>
                  <Divider sx={{m:'0.3rem'}}/>
              </Box>
              )
              
          }
          
        </Widgetwrap>
      </Box>
        )
    }  
    </Box>
    
        )

}

        </FlexBetween>

{
   nonmobile?
   <FlexBetween gap='2rem'>
<IconButton onClick={()=>{dispatch(setMode())}}>

{
   color==='dark'?
    <DarkMode
    sx={{fontSize:'25px'}}
    />:<LightMode
    sx={{fontSize:'25px'}}
    
    />
}
    </IconButton>
<IconButton onClick={()=>navigate('/Message')}>
<Message   sx={{fontSize:'25px'}} />
</IconButton>
<IconButton onClick={()=>navigate('/Notifications')}>

<Notifications   sx={{fontSize:'25px'}} />
</IconButton>

<Help   sx={{fontSize:'25px'}} />
<FormControl value={currentUser?.Name}>
    <Select
    sx={{
        width:'150px',
        borderRadius:'0.25rem 0.5rem',
        p:'0.25rem 1rem',
        cursor:'pointer',

    }}
    input={<InputBase/>}
    value = {currentUser?.Name}
    >
        <MenuItem value={currentUser?.Name}>
        <Typography>{currentUser?.Name}</Typography>
        </MenuItem>
        <MenuItem onClick={()=>LogOut()}> 
        Log Out
        </MenuItem>
    </Select>
</FormControl>
   </FlexBetween>:
   <Box sx={{display:'flex',justifyContent:'flex-end',p:'1rem'}}>


   <IconButton>

<Menu sx={{fontSize:'25px'}}  onClick={()=>{setToggle(!toggle)}}/>
   </IconButton>
   </Box>

}
{
!nonmobile&&toggle&&(

    <Box sx={{
position:'fixed',
right:0,
bottom:0,
height:'100%',
maxWidth:'500px',
minWidth:'300px',
background:background


    }}>

<Box sx={{display:'flex',justifyContent:'flex-end',p:'1rem'}}>
    <IconButton>
        <Close sx={{fontSize:'25px'}} onClick={()=>{setToggle(!toggle)}}/>
    </IconButton>
    </Box>


    <FlexBetween flexDirection='column' justifyContent='center' gap='3rem'>
<IconButton onClick={()=>{dispatch(setMode())}}>

{
   color==='dark'?
    <DarkMode
    sx={{fontSize:'25px'}}
    />:<LightMode
    sx={{fontSize:'25px'}}
    
    />
}
    </IconButton>

<Message   sx={{fontSize:'25px'}} />
<Notifications   sx={{fontSize:'25px'}} />
<Help   sx={{fontSize:'25px'}} />
<FormControl value={currentUser?.Name}>
    <Select
    sx={{
        width:'150px',
        borderRadius:'0.25rem 0.5rem',
        p:'0.25rem 1rem',
        cursor:'pointer',

    }}
    input={<InputBase/>}
    value={currentUser?.Name}
    >
        <MenuItem value={currentUser?.Name} >
        <Typography>{currentUser?.Name}</Typography>
        </MenuItem>
        <MenuItem onClick={LogOut}> 
        Log Out
        </MenuItem>
    </Select>
</FormControl>
   </FlexBetween>

  </Box>
)

}
 {
    Loading?(
      <Box sx={{position:'fixed',backgroundColor:'rgba(0,0,0,0.5)',top:'0',bottom:'0',left:'0',right:'0'}}>
     <Box sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
          <CircularProgress/>
     </Box>
      </Box>
    ):''
}
    </FlexBetween>
)
}




