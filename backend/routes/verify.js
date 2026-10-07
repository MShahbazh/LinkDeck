import express from "express";
import { verifyAPI } from "../middleware/tokenAuth.js";
import { populate } from "../controllers/index.js";

const verifyRouter = express.Router();

verifyRouter.use(verifyAPI);
verifyRouter.post("/", populate);

export default verifyRouter;
