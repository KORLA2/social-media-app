import { IconButton,InputBase,Typography ,Box,useTheme,useMediaQuery, MenuItem,FormControl, Select} from "@mui/material";
import {FlexBetween} from '../../components/FlexBetween'
import {Close, DarkMode,Menu, Help, LightMode, Message, Notifications, Search} from '@mui/icons-material'
import {setMode} from '../../state/index'
import {useSelector,useDispatch} from 'react-redux'
import { useState } from "react";
export default function Navbar(){

    let theme=useTheme();
    let dispatch=useDispatch()
    let [toggle,setToggle] =useState(false)
    let color=useSelector(state=>state.mode)
    let nonmobile=useMediaQuery('(min-width:1000px)')
    let alt=theme.palette.background.alt;
    let  dark=theme.palette.neutral?.dark;
    let background=theme.palette.background.default;
    let primary=theme.palette.primary.light;
    let neutral=theme.palette?.neutral?.light
console.log(nonmobile,theme)
return (

    <FlexBetween pading='2rem 6%' >
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

   <FlexBetween
   backgroundColor= {neutral}
gap='3rem'
padding='0.1rem 1.5rem'

   >
    <InputBase placeholder='Search...' />
    <IconButton>
        <Search/>
        </IconButton>
    </FlexBetween>
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

<Message   sx={{fontSize:'25px'}} />
<Notifications   sx={{fontSize:'25px'}} />
<Help   sx={{fontSize:'25px'}} />
<FormControl value='Korla Goutham'>
    <Select
    sx={{
        width:'150px',
        borderRadius:'0.25rem 0.5rem',
        p:'0.25rem 1rem',
        cursor:'pointer',

    }}
    input={<InputBase/>}
    value='Korla Goutham'
    >
        <MenuItem value="Korla Goutham" >
        <Typography>Korla Goutham</Typography>
        </MenuItem>
        <MenuItem> 
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
background:alt


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
<FormControl value='Korla Goutham'>
    <Select
    sx={{
        width:'150px',
        borderRadius:'0.25rem 0.5rem',
        p:'0.25rem 1rem',
        cursor:'pointer',

    }}
    input={<InputBase/>}
    value='Korla Goutham'
    >
        <MenuItem value="Korla Goutham" >
        <Typography>Korla Goutham</Typography>
        </MenuItem>
        <MenuItem> 
        Log Out
        </MenuItem>
    </Select>
</FormControl>
   </FlexBetween>

  </Box>
)

}
    </FlexBetween>
)
}
