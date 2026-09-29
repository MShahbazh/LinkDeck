import express from 'express'
import { sign } from '../controllers/index.js'

const authRouter=express.Router()

authRouter.post("/signup",sign)

export default authRouter