import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  authRouter,
  verifyRouter,
  userRouter,
  profileRouter,
} from "./routes/index.js";
import { connectToMongoDB } from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SECRET_KEY = process.env.SECRET_KEY;
const corsOption = {
  origin: ["http://localhost:5173","https://link-deck-eight.vercel.app"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

connectToMongoDB();

app.use("/auth", authRouter);
app.use("/verify", verifyRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);

app.listen(PORT, () => {
  console.log("Server Started at ", PORT);
});
