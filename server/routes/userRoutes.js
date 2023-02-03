import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import multer from "multer";
import { getUser, postUser } from "../controllers/userController.js";
router.route("/postuser").post(postUser);
router.route("/getuser").post(getUser);

export default router;
