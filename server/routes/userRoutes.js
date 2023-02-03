import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import multer from "multer";
import { getConfig, postConfig } from "../controllers/userControllers.js";
router.route("/postuser").post(postConfig);
router.route("/getuser").post(getConfig);

export default router;
