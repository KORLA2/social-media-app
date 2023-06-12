import {account,database,client,storage} from '../Appwrite/Appwrite'
import {useDispatch} from 'react-redux'
import {setcurrentUser} from '../../state/index'
import  {v4 as uuid} from 'uuid'
export let useAuth = ()=>{
    let dispatch=useDispatch();
    let Registerd= async(user,image)=>{
        
    try{
        
        let unique=uuid().split('-').join('')
       let res= await account.create(unique,user?.Mail,user?.Password,user?.Name);
           console.log(process.env.REACT_APP_User_Bucket_Id)

      
        await storage.createFile(process.env.REACT_APP_User_Bucket_Id,unique,image)
        let user_photo=await storage.getFilePreview(process.env.REACT_APP_User_Bucket_Id,unique);
      user.Media=user_photo.href;
      
let database_res= await database.createDocument(
 
    process.env.REACT_APP_Database_Id,
    process.env.REACT_APP_User_Collection_Id,
   unique,
    user
        );
     console.log(res)
     
     return database_res
    }
    catch(err){
        
        throw  err;
    }
    }

let Logined= async(user)=>{
    try{

  let Email_Response=await account.createEmailSession(user?.Mail,user?.Password)
  
   let User_response= await database.getDocument(process.env.REACT_APP_Database_Id,
    process.env.REACT_APP_User_Collection_Id,Email_Response.userId)
   
       localStorage.setItem('sessionId',Email_Response.$id)
       localStorage.setItem('unique',Email_Response.userId)
       localStorage.setItem('user',JSON.stringify(User_response))
       return User_response;
       
    }
   catch(err){
        throw err
    }
}
    return {Registerd,Logined}
    
}