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
    let {palette}=useTheme()
    let {userId} =useParams()
    let [AllMessages,setAllMessages]=useState([])
    let [message,setmessage]=useState('')
    let [Loading,setLoading]=useState(0)
         async  function fetchAllMessages(){

try{
    setLoading(1)
          let res=await database.listDocuments(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Message_Collection_Id,
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
         let unsub=client.subscribe("databases.6470905eda50ef893bdb.collections.647ac13cd54d3e2223c1.documents",(data)=>{
     setAllMessages([...AllMessages,data.payload])
   })
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
        <Box >
        <Navbar/>
        <Box sx={{width:'100%',
        display:nonmobile?'flex':undefined,
                justifyContent:nonmobile?'space-between':undefined,
             mt:'1rem', 
             p:'1rem'
        }}>
            
   
         <Box 
         display={nonmobile||!userId?'block':'none'}
        flexBasis={nonmobile?'40%':'100%'}
        >
            <Friendwidget isMessage={1}/>
        </Box>  
        
          <Box
          display={nonmobile||userId?'block':'none'}
        flexBasis={nonmobile?'40%':'100%'}
          
          >
             <Box height='100%' width='100%' display='flex' flexDirection='column' justifyContent='flex-end' backgroundColor={palette?.background?.alt}> 
             <Box height='40rem' p='1rem' overflowX='scroll' scrollbarWidth='none'>
                      {
                AllMessages?.map(e=>
          <Widgetwrap>
             <Typography color={palette?.neutral?.main} sx={{textAlign:e?.From===userId?'start':'end'}} >
                 {e?.Message}
             </Typography>
          </Widgetwrap>
             
             )
}
        
          
             </Box>
             <FlexBetween p='0.5rem' m ='0.3rem' borderRadius='0.75rem' backgroundColor={palette?.neutral?.light} >
                 <InputBase sx={{fontSize:'1rem',width:'100%'}}  value={message}
    onChange={(e)=>setmessage(e.target.value)} />
                 <IconButton >
                     <SendRounded sx={{fontSize:'2rem'}} onClick={SendMessage}/>
                 </IconButton>
             </FlexBetween>
             </Box> 
              
        </Box>
        </Box>
           {
    Loading?(
      <Box sx={{position:'fixed',backgroundColor:'rgba(0,0,0,0.5)',top:'0',bottom:'0',left:'0',right:'0'}}>
     <Box sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
          <CircularProgress/>
     </Box>
      </Box>
    ):''
}
        </Box>
    )
    
    
}