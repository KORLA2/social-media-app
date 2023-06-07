import { Widgetwrap } from "../../components/widgets"
import Navbar from '../navbar/index'
import {FlexBetween} from '../../components/FlexBetween'
import {Box,Typography,Button,Divider,CircularProgress,useTheme} from '@mui/material'
import {useEffect,useState} from 'react'
import {setFriend} from '../../state/index'
import {useSelector,useDispatch} from 'react-redux'
import {client,database,query} from '../Appwrite/Appwrite'
export default function Notifications(){
    let currentUser=useSelector(state=>state.currentUser)
    let [Notifications,setNotifications] =useState([]);
    let {palette}=useTheme()
    let background=palette.background.default;
    let alt=palette?.background?.alt;
    let medium=palette?.neutral?.medium;
let [Loading,setLoading]=useState(1)
    console.log(currentUser)
let dispatch=useDispatch()

async function fetchNotifications(){
    
    try{
       let res= await database.listDocuments('6470905eda50ef893bdb','6478e2c274ce8e6c036f',[
           
           query.equal('ToId',localStorage.getItem('unique'))
       ])
       console.log(res);
setNotifications(res.documents) 
setLoading(0)       
    }
    
    catch(err){console.log(err,'Error in Notification Page')}
    
}
async function deleteNotification(e,idx){
    
    try{
        
        await database.deleteDocument('6470905eda50ef893bdb','6478e2c274ce8e6c036f',e.$id)
        console.log('Notification successfully Deleted')
      console.log((Notifications.map((e,id)=>{if(id!==idx)return e;})))
      setNotifications(Notifications.map((e,id)=>{if(id!==idx)return e;}));
      
 let  {Mail,Password,Name,City,Occupation,Friends,posts}= await database.getDocument('6470905eda50ef893bdb','6470906723f0b50c18db',e.FromId)
            Friends.push(e.ToId)
   await  database.updateDocument('6470905eda50ef893bdb','6470906723f0b50c18db',e.FromId,
                 {Mail:Mail,Password:Password,Name:Name,City:City,Occupation:Occupation,Friends:Friends,posts:posts})
     

    }catch(err){console.log(err,'Error in deleting Notification')}
}



useEffect(()=>{
    
     async function  updateuser(){
         
    if(currentUser.Mail!==''){
     
    try{
        let res=await database.updateDocument('6470905eda50ef893bdb','6470906723f0b50c18db',localStorage.getItem('unique'),currentUser)
     console.log('success in user data base Friends',res)
    
    }
   catch(err){console.log('failed in users friends',err)}
    }
    }
    updateuser();
},[currentUser.Friends])

useEffect(()=>{
        
  let unsubs=client.subscribe('databases.6470905eda50ef893bdb.collections.6478e2c274ce8e6c036f.documents',(data)=>{
if(data.payload.ToId===localStorage.getItem('unique'))
setNotifications([...Notifications,data.payload])

  })
      console.log(unsubs);
        fetchNotifications();
    },[])
    

    
    return (
        <Box>
        <Navbar/>
    <Box m='1rem' p='1rem' >
        <Widgetwrap>{
            Notifications?.map((e,idx)=>
            <Box >
                <FlexBetween gap='2rem'>
                        <Typography sx={{textAlign:'center'}} >
           {e.Name} sent You Request
            </Typography>
            <FlexBetween gap='2rem'>
            <Button sx={{backgroundColor:'green' ,color:background,
            "&:hover":{
                color:medium
            }
            }} variant='outlined'
            onClick={()=>
                {
                    
            dispatch(setFriend({friend:e.FromId}))
            deleteNotification(e,idx)
            
                }
            
            }
            >
            Accept
            </Button>
         <Button sx={{backgroundColor:'red',color:alt,
          "&:hover":{
                color:medium
            }
         }}
         
          variant='outlined'>
           Reject
            </Button>
            </FlexBetween>
              </FlexBetween>
                
            <Divider sx={{m:'1rem'}}/>
                </Box>
            )
    
            }
        </Widgetwrap>
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