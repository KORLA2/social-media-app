import {Widgetwrap} from '../../components/widgets'
import {Post} from './Post'
import {Box} from '@mui/material'
export let  InterestedPosts=()=>{

let myposts=
[
{

    Name:'Korla Akhil',
    Location:'Hyderabad',
    Likes:'7',
    Comments:'10',
    Profession:'Mechanical Engineer',

},
{

    Name:'Korla Mummy',
    Location:'Hyderabad',
    Likes:'3',
    Comments:'1',
    Profession:'10th fail',
    
},
{

    Name:'Korla Daddy',
    Location:'Hyderabad',
    Likes:'17',
    Comments:'12',
    Profession:'10th Pass',
    
},

]



    return (
<Box>
{
myposts.map(e=>(
    <Post
    Name={e.Name}
    />
))

}
</Box>

    )
}
