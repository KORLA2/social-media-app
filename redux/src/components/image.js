import {Box} from '@mui/material'
export let Image =({image,size='60px'})=>{
return(
    <Box height='auto' width={size}>

<img style={{objectFit:'cover',
borderRadius:'50%'
}}
width={size}
height={size}
src={image} alt='user'/>
        </Box>
)
}