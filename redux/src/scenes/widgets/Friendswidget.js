import {Friend}  from '../../components/Friends';
import { Widgetwrap } from '../../components/widgets';
import { Typography,Box ,useTheme,Divider} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
export let Friendwidget=()=>{

let {userID}=useParams()
let user=useSelector(state=>userID?state.navigatedUser:state.currentUser)

let {palette}=useTheme()
let dark=palette.neutral?.dark
    return (
<Widgetwrap>

<Typography color={dark}
fontWeight={500}
sx={{mb:'1.5rem'}}
variant='h5'
>
My Friends
</Typography>
<Box display='flex'  flexDirection='column'  gap='1.5rem'>
 {
     user.Friends?.map(e=>
     <Box >
     <Friend UserId={e}/>
     <Divider/>
     </Box>
     )
     
 }
</Box>
    </Widgetwrap>

    )

}