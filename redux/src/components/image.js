import {Box} from '@mui/material'
import image from './Hero.png'
export let Image =({size='60px'})=>{
return(
    <Box height={size} width={size}>

<img style={{objectFit:'cover',
borderRadius:'50%'
}}
width={size}
height={size}
src={image} alt='user'/>
        </Box>
)
}