import { Widgetwrap } from "../../components/widgets"
import Navbar from '../navbar/index'
import emailjs from '@emailjs/browser';
import {FlexBetween} from '../../components/FlexBetween'
import {Box,Typography,Button,Divider,CircularProgress,useTheme} from '@mui/material'
import {useEffect,useState} from 'react'
import {setFriend} from '../../state/index'
import {useSelector,useDispatch} from 'react-redux'
import {client,database,query} from '../Appwrite/Appwrite'
export default function Notifications(){
    let currentUser=JSON.parse(localStorage.getItem('user'))
    let [ToNotifications,setToNotifications] = useState([]);
    let [FromNotifications,setFromNotifications] = useState([]);
    let {palette}=useTheme()
    let background=palette.background.default;
    let alt=palette?.background?.alt;
    let medium=palette?.neutral?.medium;
let [Loading,setLoading]=useState(1)

    console.log(currentUser)
let dispatch=useDispatch()

async function fetchNotifications(){
    
    try{
       let To_Response= await database.listDocuments(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Notification_Collection_Id,[
           
           query.equal('ToId',localStorage.getItem('unique'))
           
       ])
       
       
setToNotifications(To_Response.documents) 

let From_Response=await database.listDocuments(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Notification_Collection_Id,[
    query.equal('FromId',localStorage.getItem('unique')),
    query.notEqual('accepted','')
])
setFromNotifications(From_Response.documents)


setLoading(0)       
    }
    
    catch(err){console.log(err,'Error in Notification Page')}
    
}
async function deleteNotification(e,idx,isRejected){
    
    try{
       
        setLoading(1)
        await database.deleteDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Notification_Collection_Id,e.$id)
        console.log('Notification successfully Deleted')
    //   setNotifications(Notifications?.map((e,id)=>{if(id!==idx)return e;}));
     let Remaining_notifications=ToNotifications;
     
      Remaining_notifications.splice(idx,1);
     if(isRejected) 
     setToNotifications(Remaining_notifications)
     else 
     setFromNotifications(Remaining_notifications)
setLoading(0)

    }catch(err){console.log(err,'Error in deleting Notification')}
}


let  updateNotification= async(e,idx)=>{
    
    try{
        setLoading(1)
        await database.updateDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_Notification_Collection_Id,e.$id,{
            Name:e.Name,
            ToId:e.ToId,
            FromId:e.FromId,
            accepted:'yes',
            From_Mail:e.From_Mail
        })
      let modifiedNotifications=  ToNotifications;
      modifiedNotifications[idx].accepted='yes';
      console.log(modifiedNotifications)
     emailjs.send(process.env.REACT_APP_Service_Id,process.env.REACT_APP_Second_Template_Id,{Mail:e.From_Mail,To_Name:e.Name,From_Name:currentUser.Name},process.env.REACT_APP_Public_Key)

      
      setToNotifications(modifiedNotifications)
      setLoading(0)
    }
    catch(err){
        console.log('error in updating',err)
    }
    
}
console.log(ToNotifications)

useEffect(()=>{
    
    
     async function  updateuser(){
       
    try{
        let res=await database.updateDocument(process.env.REACT_APP_Database_Id,process.env.REACT_APP_User_Collection_Id,localStorage.getItem('unique'),currentUser)
     console.log('success in user data base Friends',res)
    
    }
   catch(err){console.log('failed in users friends',err)}
    
    }
    updateuser()
    
},[currentUser.Friends])
    
    
    


useEffect(()=>{

  fetchNotifications();
    },[])
    

    
    return (
        <Box>
        <Navbar/>
    <Box m='1rem' p='1rem' >
        <Widgetwrap>
            {
            ToNotifications?.map((e,idx)=>
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
                    
            dispatch(setFriend({friend:[e.FromId]}))
             updateNotification(e,idx)
                }
            }
            disabled={e.accepted==="yes"?1:0}
            
            >
           { e.accepted!=="yes"?'Accept':'Accepted'}
            </Button>
         <Button sx={{backgroundColor:'red',color:alt,
          "&:hover":{
                color:medium
            }
         }}
         disabled={!e.accepted?0:1}
         onClick={()=>deleteNotification(e,idx,1)}
          variant='outlined'>
          Reject
            </Button>
            </FlexBetween>
              </FlexBetween>
                
            <Divider sx={{m:'1rem'}}/>
                </Box>
            )
    
            }
            {
                FromNotifications?.map((e,idx)=>
            <Box >
                <FlexBetween gap='2rem'>
                        <Typography sx={{textAlign:'center'}} >
           {e.To_Name} Accepted Your Request
            </Typography>
          
            <Button sx={{backgroundColor:'green' ,color:background,
            "&:hover":{
                color:medium
            }
            }} variant='outlined'
            onClick={()=>
                {
                    
            dispatch(setFriend({friend:[e.ToId]}))
            deleteNotification(e,idx,0)
                }
            
            }
            >
            Done
            </Button>
         
              </FlexBetween>
                
            <Divider sx={{m:'1rem'}}/>
                </Box>
            )

}
{
    !ToNotifications.length && !FromNotifications.length?<Typography textAlign='center' color={medium} >No New Notifications</Typography>:''
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