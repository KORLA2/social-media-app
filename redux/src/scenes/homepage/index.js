import Navbar from '../navbar/index'
import Widgets from '../widgets/index'
import {UserInterest} from '../widgets/UserInterest'
import {Box, useMediaQuery} from '@mui/material'
import {InterestedPosts} from '../widgets/InterestedPosts'
import {Advert} from '../widgets/Advert'
export default function  HomePage (){
let nonmobile=useMediaQuery('(min-width:1000px)')

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


<Box 
flexBasis={nonmobile?'26%':undefined}
>
<Widgets/>
    
    </Box>

    <Box 
flexBasis={nonmobile?'42%':undefined}
mt={nonmobile?undefined:'2rem'}
>
<UserInterest/>

    <InterestedPosts/>
    </Box>
  {
    nonmobile&&(

    <Box 
flexBasis={nonmobile?'26%':undefined}
>
<Advert/>
    
    </Box>)
}

</Box>

</Box>

    )
}