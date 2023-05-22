import { Box,useTheme,Typography } from "@mui/material"

export default function  LoginPage (){
    let theme=useTheme();
    let background=theme.palette.background.alt
    let primary=theme.palette.primary.light;

return (

    <Box>
<Box
width='100%'
p='1rem 6%'
background={background}
textAlign='center'
>
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
    </Box>

        </Box>

    )
}