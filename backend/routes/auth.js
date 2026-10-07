import express from "express";
import { sign, login, logout } from "../controllers/auth.js";
import { checkAuth } from "../middleware/authChecker.js";

const authRouter = express.Router();

authRouter.post("/signup", checkAuth, sign);
authRouter.post("/login", checkAuth, login);
authRouter.post("/logout", logout);

export default authRouter;
