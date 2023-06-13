import {useTheme,Box,Typography} from '@mui/material'
import {FlexBetween} from '../../components/FlexBetween'
import { Widgetwrap } from '../../components/widgets'
import image from '../../components/Beauty.jpg'
export let Advert=()=>{
 let {palette}= useTheme();
let dark=palette.neutral?.dark,
main= palette.neutral?.main,
medium=palette.neutral?.medium;
    return (
        
<Widgetwrap >
<FlexBetween>

<Typography color={dark} variant='h5' fontWeight={500}>
    Mika Cosmetics
</Typography>
<Typography color={medium} >
   Create Ad
</Typography>
</FlexBetween>

<img
width='100%'
height='auto'
src={image}
style={{borderRadius:'0.75rem',margin:'0.75rem 0'}}
/>

<FlexBetween>
    <Typography color={main}>
Mika Cosmetics
    </Typography> <Typography color={medium}>
Reach out to our website for more information
    </Typography>
</FlexBetween>
 <Typography color={medium} m='0.5rem 0'>
Reach out to our website for more information whichadds valeue to your face

    </Typography>
</Widgetwrap>

    )
}