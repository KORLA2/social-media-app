import Navbar from '../navbar/index'
import {useMediaQuery,Box} from  '@mui/material'
import {Widgetwrap} from '../../components/widgets'
import {Friend} from '../../components/Friends'
export default function Message(){
    let nonmobile=useMediaQuery('(min-width:100px)')
    return (
        <Box>
<Navbar/>
<Box
width='100%'
display={nonmobile?'flex':'block'}
gap='0.5rem'
padding='2rem 5%'
justifyContent='space-between'
>
    <Widgetwrap>
        <Friend/>
        
    </Widgetwrap>
    
    </Box>
            </Box>
        
    )
    
}