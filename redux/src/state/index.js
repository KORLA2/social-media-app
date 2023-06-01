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
    posts:[]
    
},
navigatedUser:{
    Mail:'',
    Password:'',
    Name:'',
    City:'',
    Occupation:'',
    Friends:[],
    posts:[]
    
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
        setFriends:(state,action)=>{
  
            state.currentUser.Friends=action.payload.friends
        }
    ,
setcurrentUser:(state,action)=>{
state.currentUser=action.payload.user;
},setnavigatedUser:(state,action)=>{
state.navigatedUser=action.payload.user;
},
    setdummyUser:(state,action)=>{
        state.currentUser=action.payload.user
    },

    setPost:(state,action)=>{
        console.log('Iam happy wow')
        
   state.currentUser.posts=[...state.currentUser.posts,action.payload.post]

    }
    } ,
})

export let {setMode,setPost,setFriends,setPosts,setcurrentUser,setdummyUser,setnavigatedUser}=mySlice.actions;

export default mySlice.reducer
