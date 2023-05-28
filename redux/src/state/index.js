import {createSlice} from '@reduxjs/toolkit'
let initialState={
mode:'light',
user:null,
posts:[],


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
  
            state.user.friends=action.payload.friends
        }
    ,
setUser:(state,action)=>{
state.user=action.payload.user;
},
    setPosts:(state,action)=>{
        state.posts=action.payload.posts
    },

    setPost:(state,action)=>{
        console.log('Iam happy wow')
        
   state.user.posts=[...state.user.posts,action.payload.post]

    }
    } ,
})

export let {setMode,setPost,setFriends,setPosts,setUser}=mySlice.actions;

export default mySlice.reducer
