import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import multer from "multer";
import { getConfig, postConfig } from "../controllers/configControllers.js";
router.route("/postConfig").post(postConfig);
router.route("/getConfig").post(getConfig);

export default router;
