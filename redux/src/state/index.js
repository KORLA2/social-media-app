import {createSlice} from '@reduxjs/toolkit'
let initialState={
mode:'light',

navigatedUser:{
    Mail:'',
    Password:'',
    Name:'',
    City:'',
    Occupation:'',
    Friends:[],
    posts:[],
    Media:''
},

}
export let mySlice=createSlice({
    name:'sliced',
    initialState,
    reducers:{

        setMode:(state)=>{
            state.mode=state.mode==='dark'?'light':'dark'
        }
     ,
        setFriend:(state,action)=>{
  
let user=  JSON.parse(localStorage.getItem('user'));
    user.Friends.push(action.payload.friend)
    localStorage.setItem('user',JSON.stringify(user))
       
        }
    ,

setnavigatedUser:(state,action)=>{
state.navigatedUser=action.payload.user;
},
   
    setPost:(state,action)=>{
let user=  JSON.parse(localStorage.getItem('user'));
    user.posts.push(action.payload.post)
     localStorage.setItem('user',JSON.stringify(user))

    },
  
    } ,
})

export let {setMode,setPost,setFriend,setnavigatedUser}=mySlice.actions;

export default mySlice.reducer
