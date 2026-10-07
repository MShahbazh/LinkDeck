import express from "express";
import { verifyAPI } from "../middleware/tokenAuth.js";
import {
  updateUser,
  addLink,
  deleteLink,
  editLink,
} from "../controllers/index.js";

const userRouter = express.Router();

userRouter.use(verifyAPI);
userRouter.patch("/update", updateUser);
userRouter.post("/addLink", addLink);
userRouter.post("/deleteLink", deleteLink);
userRouter.post("/editLink", editLink);

export default userRouter;
