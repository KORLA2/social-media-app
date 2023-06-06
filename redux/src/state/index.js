import {createSlice} from '@reduxjs/toolkit'
let initialState={
mode:'light',
currentUser:{
    Mail:'',
    Password:'',
    Name:'',
    City:'',
    Occupation:'',
    Friends:[],
    posts:[],
    Media:''
  
},
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
  
            state.currentUser.Friends=[...state.currentUser.Friends,action.payload.friend]
        }
    ,

setnavigatedUser:(state,action)=>{
state.navigatedUser=action.payload.user;
},
   
    setPost:(state,action)=>{
        console.log('Iam happy wow')
        
   state.currentUser.posts=[...state.currentUser.posts,action.payload.post]

    },
    setcurrentUser:(state,action)=>{
        console.log(action.payload.user)
        state.currentUser=action.payload.user
        
    },
    } ,
})

export let {setMode,setPost,setFriend,setcurrentUser,setnavigatedUser}=mySlice.actions;

export default mySlice.reducer
