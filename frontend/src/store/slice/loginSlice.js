import { createSlice } from "@reduxjs/toolkit";

export const loginSlice=createSlice({
    name:"loginSlice",
    initialState:{login:false,user:null},
    reducers:{
        setLogin:(state,action)=>{
            state.login=!state.login
            state.user=action.payload
        },
        logout:(state)=>{
            state.user=null
            state.login=false 
        }
    }
})

export const {setLogin,logout} = loginSlice.actions