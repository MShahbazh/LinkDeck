import express from "express";
import { getProfile } from "../controllers/index.js";

const profileRouter = express.Router();

profileRouter.get("/:username", getProfile);

export default profileRouter;
