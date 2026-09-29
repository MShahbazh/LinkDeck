import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { authRouter } from './routes/index.js'


dotenv.config()
const app=express()
const PORT=process.env.PORT
const corsOption={
    origin:"http://localhost:5173",
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true    
}

app.use(cors(corsOption))
app.use(express.json())
app.use("/auth",authRouter)

app.listen(PORT,()=>{
    console.log("Server Started at ",PORT);
})