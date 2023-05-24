import {Widgetwrap} from '../../components/widgets'
import {Post} from './Post'
import {Box} from '@mui/material'
import image from '../../components/Hero.png'
export let  InterestedPosts=()=>{

let myposts=
[
{

    Name:'Korla Akhil',
    Location:'Hyderabad',
    Likes:'7',
    Comments:'10',
    Mycomments:[
        "Great",
        "Congrats on the new Role",
        "All th Best",
        "How did you get that  Job",
        "What is the intervew process"
    ],
    image:{image},
    description:'Iam extremely delighted to get job at Infosys Thankyou very much t all people who helped in my tough tiimes to prepare for this interview',
    Profession:'Mechanical Engineer',

},
{

    Name:'Korla Mummy',
    Location:'Hyderabad',
    Likes:'3',
    image:{image},
    Mycomments:[
        "Great",
        "Congrats on the new Role",
        "All th Best",
        "How did you get that  Job",
        "What is the intervew process"
    ],
    description:'Iam extremely delighted to get job at Infosys Thankyou very much t all people who helped in my tough tiimes to prepare for this interview',
    Comments:'1',
    Profession:'10th fail',
    
},
{

    Name:'Korla Daddy',
    Location:'Hyderabad',
    Likes:'17',
    image:{image},
    Mycomments:[
        "Great",
        "Congrats on the new Role",
        "All th Best",
        "How did you get that  Job",
        "What is the intervew process"
    ],
    description:'Iam extremely delighted to get job at Infosys Thankyou very much t all people who helped in my tough tiimes to prepare for this interview',
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
    Profession={e.Profession}
    image={e.image}
  description={e.description}
  Likes={e.Likes}
  Comments={e.Comments}
  Mycomments={e.Mycomments}
    />
))

}
</Box>

    )
}
