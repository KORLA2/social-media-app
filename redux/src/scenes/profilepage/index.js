
import Navbar from '../navbar/index'
import Widgets from '../widgets/index'

import {Box, useMediaQuery} from '@mui/material'
import {InterestedPosts} from '../widgets/InterestedPosts'

import {Friendwidget} from '../widgets/Friendswidget'
export default function  ProfilePage (){
    let nonmobile=useMediaQuery('(min-width:1000px)')
return (

    <Box>
<Navbar/>

<Box
width='100%'
display={nonmobile?'flex':'block'}
gap='2rem'
padding='2rem 5%'
justifyContent='center'
>


<Box 
flexBasis={nonmobile?'26%':undefined}
>
   
<Widgets/>
<Box mt='2rem'/>
<Friendwidget/>


    </Box>

    <Box 
flexBasis={nonmobile?'42%':undefined}
mt={nonmobile?undefined:'2rem'}
>

  <InterestedPosts/>
    </Box>
 
</Box>

</Box>
    
    )
}