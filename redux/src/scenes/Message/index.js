import Navbar from '../navbar/index'
import {useMediaQuery,Box,InputBase,Typography,useTheme,IconButton,CircularProgress} from  '@mui/material'
import {Widgetwrap} from '../../components/widgets'
import {SendRounded} from '@mui/icons-material'
import {Friendwidget} from '../widgets/Friendswidget'
import {FlexBetween} from "../../components/FlexBetween";
import {Friend} from '../../components/Friends'
import {v4 as uuid} from 'uuid'
import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {query, database,client } from '../Appwrite/Appwrite'
export default function Message(){
    let nonmobile=useMediaQuery('(min-width:1000px)')
    let {palette}=useTheme();
    let main=palette?.neutral?.light
    let [message,setmessage]=useState('');
    let {userId} =useParams();
  let [Loading,setLoading]=useState(1)

    let [AllMessages,setAllMessages]=useState([]);
     async  function fetchAllMessages(){

try{
        setLoading(1)
          let res=await database.listDocuments('6470905eda50ef893bdb','647ac13cd54d3e2223c1',
   [query.equal('From',[userId,localStorage.getItem('unique')]),
    query.equal('To',[userId,localStorage.getItem('unique')])
         ]      )
        
     setAllMessages(res.documents)
setLoading(0)
          
        }
        catch(err){
            console.log(err,'Failed to fetch All Messages')
          
        }
    }
        useEffect(()=>{
                
         
     fetchAllMessages()
        
      
    },[userId])
    
      useEffect(()=>{
          console.log(AllMessages)
          
         let unsub=    client.subscribe("databases.6470905eda50ef893bdb.collections.647ac13cd54d3e2223c1.documents",(data)=>{
      if(data.payload.From===userId&&data.payload.To===localStorage.getItem('unique')||data.payload.To===userId&&data.payload.From===localStorage.getItem('unique'))

{
    
fetchAllMessages()
}     
     }) 
  
        
    },[])
    
  
   
  
   async function SendMessage(){
        try{
            let res=await database.createDocument('6470905eda50ef893bdb','647ac13cd54d3e2223c1',uuid(),{From:localStorage.getItem('unique'),To:userId,Message:message})
       setmessage('')
        }
        catch(err){console.log('Error in Message Page')}
        
    }
    console.log(AllMessages)
    return (
        <Box>
<Navbar/>
<Box
width='100%'
display='flex'
gap='0.5rem'
padding='2rem 5%'
justifyContent='space-between'>
<Box flexBasis='50%' >
    <Friendwidget isMessage={1}/>
</Box>

<Box flexBasis='50%' position='relative'>
    <Widgetwrap position='fixed' height='600px' width='600px' top='10%' display='flex' justifyContent={userId?'':'center'} alignItems={userId?AllMessages?'':'flex-end':'center'}   bottom='2%'
    >
    
    
     {
         userId?<Box position='absoute' height='600px' width='600px'>
       <Box height='500px' >
                       {
                AllMessages.map(e=>
             <Typography color={palette?.neutral?.main} sx={{textAlign:e.From===userId?'start':'end'}} >
                 {e.Message}
             </Typography>
             )
}
</Box>
         
        <FlexBetween width='100%' bottom='2%'   backgroundColor= {main}>
    <InputBase placeholder='SendMessage...' 
    value={message}
    onChange={(e)=>setmessage(e.target.value)}
     sx={{    
borderRadius:'0.75rem',

      width:'100%',p:'0.5rem'}}/>
    <IconButton onClick={SendMessage}  >
    <SendRounded/>
    </IconButton>
    </FlexBetween> </Box>
    :
     <Typography  >
                Choose a Friend Fom Left Start Chat
                </Typography>
     }   

    </Widgetwrap>
    
</Box>
</Box>
{
    Loading?(
      <Box sx={{position:'fixed',backgroundColor:'rgba(0,0,0,0.5)',top:'0',bottom:'0',left:'0',right:'0',zIndex:1}}>
     <Box sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
          <CircularProgress/>
     </Box>
      </Box>
    ):''
}
  </Box>
        
    )
    
}