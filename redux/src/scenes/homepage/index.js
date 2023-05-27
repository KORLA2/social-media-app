import Navbar from '../navbar/index'
import Widgets from '../widgets/index'
import {useEffect} from 'react'
import {UserInterest} from '../widgets/UserInterest'
import {Box, useMediaQuery} from '@mui/material'
import {database} from '../Appwrite/Appwrite'
import {setUser} from '../../state/index'
import {InterestedPosts} from '../widgets/InterestedPosts'
import {Advert} from '../widgets/Advert'
import {Friendwidget} from '../widgets/Friendswidget'
import { useSelector } from 'react-redux'
export default function  HomePage (){
let nonmobile=useMediaQuery('(min-width:1000px)')


let fetch=async()=>{

let pro=database.getDocument('6470905eda50ef893bdb','6471f8d937a5db1db18e','6471fe2c30f44cac59bb')

pro.then(
    function(res){
        console.log(res)
    },
    function(err){
        console.log(err)
    }
)

}
useEffect(()=>{
fetch()

},[])



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
<Box mt='2rem'/>
    <Friendwidget/>
    </Box>)
}

</Box>

</Box>

    )
}