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
    let [AllMessages,setAllMessages]=useState([]);
    let {palette}=useTheme();
    let main=palette?.neutral?.light
    let [message,setmessage]=useState('');
    let {userId} =useParams();
  let [Loading,setLoading]=useState(0)
     async  function fetchAllMessages(){

try{
    // setLoading(1)
          let res=await database.listDocuments(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Message_Collection_Id,
   [query.equal('From',[userId,localStorage.getItem('unique')]),
    query.equal('To',[userId,localStorage.getItem('unique')])
         ]      )
       
     setAllMessages(res.documents)
     localStorage.setItem('Messages',JSON.stringify(res.documents))
    // setLoading(0)
          
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
    let Messages=JSON.parse(localStorage.getItem('Messages'));
console.log(Messages,data.payload)
Messages.push(data.payload)
    localStorage.setItem('Messages',JSON.stringify(Messages));
setAllMessages(Messages)
}     
     }) 
  
        
    },[])
    
  
   
  
   async function SendMessage(){
        try{
            if(!message)return;
            let res=await database.createDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Message_Collection_Id,uuid(),{From:localStorage.getItem('unique'),To:userId,Message:message})
    setmessage('');
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
    <Widgetwrap  height='600px' width='600px' overflowY='scroll' display='flex' justifyContent={userId?'':'center'} alignItems={userId?AllMessages?'':'flex-end':'center'}   bottom='2%'
    >
    
    
     {
         userId?<Box height='600px' width='600px'>
       <Box height='500px'  >
                       {
                AllMessages?.map(e=>
             <Typography color={palette?.neutral?.main} sx={{textAlign:e?.From===userId?'start':'end'}} >
                 {e?.Message}
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