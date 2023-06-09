import { IconButton,InputBase,Typography ,Box,useTheme,CircularProgress,useMediaQuery,Badge,MenuItem,Divider,FormControl, Select} from "@mui/material";
import {FlexBetween} from '../../components/FlexBetween'
import {Close, DarkMode,Menu, Help, LightMode, Message, Notifications, Search} from '@mui/icons-material'
import {setMode,setdummyUser} from '../../state/index'
import {useSelector,useDispatch} from 'react-redux'
import { useState ,useEffect} from "react";
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
let main=theme?.palette.neutral?.main 

    let background=theme.palette.background.default;
    let primary=theme.palette.primary.dark;
    let neutral=theme.palette?.neutral?.light
    let currentUser=JSON.parse(localStorage.getItem('user'))
const [Input, setInput] = useState(false);
    
const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  let [Loading,setLoading]=useState(0)
  const handleClose = () => setOpen(false);
  let [SuggestedUsers,setSuggestedUsers]=useState([]);
console.log(currentUser)
let [AllNotifications,setAllNotifications]=useState(0)
async function fetchNotifications(){
    try{
        setLoading(1)
  let notifications= await database.listDocuments(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Notification_Collection_Id)
   notifications=  notifications.documents.filter((e)=>{
         if((e.FromId===localStorage.getItem('unique'))&&e.accepted||e.ToId===localStorage.getItem('unique'))return e;
     })
  console.log(notifications.length)
     
setLoading(0)
setAllNotifications(notifications.length)
    }
    catch(err)
{
    console.log(err,'navbar notifications')
}    
}

useEffect(()=>{
    
    fetchNotifications()
},[])

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
       
   let res=await  database.listDocuments(process.env.REACT_APP_Database_Id,process.env.REACT_APP_User_Collection_Id,
    
[query.search('Name',e.target.value)
   ]   )
    setSuggestedUsers(res.documents)
   }
   catch(err){console.log(err)}
}
useEffect(()=>{
    handleClose()
    
    if(Input){
    setInput()
    }
},[nonmobile])

return (

<FlexBetween  position='relative' pading='2rem 6%' backgroundColor={alt} >
       

      <FlexBetween  gap='1.75rem'>
<Typography fontWeight='bold'
fontSize='clamp(1rem,2rem,2.25rem)'
sx={{
    "&:hover":{
        color:primary,

        cursor:'pointer'


    }
}}
onClick={()=>navigate('/home')}
>
    SocialNetwork
</Typography>



{
    Input||nonmobile?(
<Box >
   <FlexBetween
   backgroundColor= {neutral}
gap='3rem'
padding='0.1rem 1.5rem'

onClick={handleOpen}
sx={{position:Input?'absolute':'',  top:'0',left:'0',bottom:'0',right:'0',zIndex:1}}
   >
    <InputBase  p='0.1rem' fullWidth placeholder='Search...' onChange={Suggested} />
    

    
    <IconButton>
        <Search/>
        </IconButton>
    </FlexBetween>
    
    </Box>
    
        ):''

}

        </FlexBetween>

{
 nonmobile?
   <FlexBetween gap='2rem' >
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
    
    <IconButton>
    <Search />
    </IconButton>
<IconButton onClick={()=>navigate('/Message')}>
<Message   sx={{fontSize:'25px'}} />
</IconButton>
<IconButton onClick={()=>navigate('/Notifications')}>
<Badge badgeContent={AllNotifications}  color="success">
<Notifications   sx={{fontSize:'25px'}} />
</Badge>
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
!nonmobile&&toggle?(

    <Box sx={{
position:'fixed',
right:0,
bottom:0,
zIndex:2,
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
<IconButton onClick={()=>{ setToggle(0);dispatch(setMode())}}>

{
   color==='dark'?
    <DarkMode
    sx={{fontSize:'25px'}}
    />:<LightMode
    sx={{fontSize:'25px'}}
    
    />
}
    </IconButton>
<IconButton onClick={()=>{setToggle(0);navigate('/Message')}}>
<Message   sx={{fontSize:'25px'}} />
</IconButton>
<IconButton  onClick={()=>{setToggle(0);handleOpen();setInput(1)}}>
<Search sx={{fontSize:'25px'}}/>
</IconButton>
<IconButton onClick={()=>{navigate('/Notifications');setToggle(0) }}  sx={{fontSize:'25px'}}>
    
<Badge badgeContent={AllNotifications} color="success">
<Notifications   sx={{fontSize:'25px'}} />
</Badge>
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
    value={currentUser?.Name}
    >
        <MenuItem value={currentUser?.Name} >
        <Typography>{currentUser?.Name}</Typography>
        </MenuItem>
        <MenuItem onClick={()=>{LogOut();setToggle(0)}}> 
        Log Out
        </MenuItem>
    </Select>
</FormControl>
   </FlexBetween>

  </Box>

):''
}


{
        open?(
            <Box
onClick={handleClose}
            
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{position:'fixed' ,top:Input?'9%':'8%',left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,0.5)',zIndex:3}}
      >
        <Widgetwrap sx={{width:Input?'auto':400,position:'absolute',left:Input?'0':'15%',right:Input?'0':'', top:'2%'}} >
          {
              SuggestedUsers.length?SuggestedUsers.map(e=>
                  <Box display='flex' flexDirection='column' gap='0.5rem'>
                  <Friend UserId={e.$id} isMessage={0}/>
                  <Divider sx={{m:'0.3rem'}}/>
              </Box>
              ):<Typography color={main}>
                 Search Users in SocialNetwork
                  </Typography>
              
          }
          
        </Widgetwrap>
      </Box>
        ):''
    }  

    </FlexBetween>

)
}





