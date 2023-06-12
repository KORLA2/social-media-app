import { useEffect } from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom'
import {account} from './scenes/Appwrite/Appwrite'
import {Box,Typography,Button,useTheme} from '@mui/material'
export let Verify=()=>{
  let navigate=useNavigate()
  let [search]=useSearchParams()
let {palette}=useTheme()
  useEffect(()=>{
        let UserId=search.get('userId')
  let secret=search.get('secret')
  console.log(UserId,secret)
      account.updateVerification(UserId,secret).then(()=>console.log('Verified')).catch((err)=>console.log(err,'user unverified'))
      
  },[])
  
    return (
      <Box sx={{display:'grid',placeItems:'center',height:'100vh'}}>
        <Box display='flex' flexDirection='column'>
     <Typography color={palette?.neutral?.medium}>
     Your Account Has been succesfully verified
     </Typography>
<Button variant='contained' onClick={()=>navigate('/home')}>
GO Back
</Button>
</Box>
      </Box>
     
    )
}





