
import { AccountTreeOutlined } from '@mui/icons-material'
import {FlexBetween} from './FlexBetween'
import { useTheme,Box,Typography } from '@mui/material'
import { Image } from './image'
export let  Friend=({Name,Profession})=>{
let {palette}=useTheme()
    
let main=palette.neutral?.main;
let medium=palette.neutral?.medium
let primarylight=palette.primary?.light;
return(
    <FlexBetween>
    <FlexBetween gap='1rem'>

<Image/>
<Box>
<Typography color={main} fontWeight='500'
sx={{"&:hover":{
    color:primarylight,
    cursor:'pointer'
}}}
>
{Name}
    </Typography >
    <Typography color={medium} fontSize='0.75rem'>
{Profession}
    </Typography >
    </Box>
    </FlexBetween>
<AccountTreeOutlined/>
    </FlexBetween>

)

}