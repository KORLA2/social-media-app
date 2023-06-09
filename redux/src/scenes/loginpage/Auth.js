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
           console.log(unique)
       
        await storage.createFile('647dc0ede1a1dad59818',unique,image)
        let user_photo=await storage.getFilePreview('647dc0ede1a1dad59818',unique);
      user.Media=user_photo.href;
      
let database_res= await database.createDocument(
 
    '6470905eda50ef893bdb',
    '6470906723f0b50c18db',
   unique,
    user
        );
     console.log(res)
     
     return database_res;

    }
    catch(err){
        
        throw  err;
    }
    }

let Logined= async(user)=>{
    try{
        
  let Email_Response=await account.createEmailSession(user?.Mail,user?.Password)
 
   let Database_response= await database.getDocument('6470905eda50ef893bdb','6470906723f0b50c18db',Email_Response.userId)
     console.log(Database_response)
    let User={  Mail:Database_response.Mail,
    Password:Database_response.Password,
    Name:Database_response.Name,
    City:Database_response.City,
    Occupation:Database_response.Occupation,
    Friends:Database_response.Friends,
    posts:Database_response.posts,
    Media:Database_response.Media}

       localStorage.setItem('sessionId',Email_Response.$id)
       localStorage.setItem('unique',Email_Response.userId)
       localStorage.setItem('user',JSON.stringify(User))
       return Database_response;
       
    }
   catch(err){
        throw err
    }
}
    return {Registerd,Logined}
    
}