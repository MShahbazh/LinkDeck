import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signup=createAsyncThunk("/auth/signup",
    async (signData)=>{
        try {
            const response = await fetch("http://localhost:8000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signData)
            });
        } catch (error){
            console.log(error)  
        }
    }
);

export const authSlice=createSlice({
    name:"authSlice",
    initialState:{user:null,loading:false,error:null,message:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(signup.pending,(state)=>{})
        .addCase(signup.fulfilled,(state)=>{})
        .addCase(signup.rejected,(state)=>{})
    }
})

export default authSlice.reducer
