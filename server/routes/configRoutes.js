import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import multer from "multer";
import { getUser, postUser } from "../controllers/userController.js";
router.route("/postConfig").post(postUser);
router.route("/getConfig").post(getUser);

export default router;
