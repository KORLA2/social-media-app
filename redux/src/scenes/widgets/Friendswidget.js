import {Friend}  from '../../components/Friends';
import { Widgetwrap } from '../../components/widgets';
import { Typography,Box ,useTheme} from '@mui/material';
export let Friendwidget=()=>{


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
    <Friend/>
    <Friend/>
    <Friend/>
    <Friend/>
</Box>
    </Widgetwrap>

    )

}