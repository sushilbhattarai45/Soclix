import Express from "express";
import mongoose from "mongoose";
const router = Express.Router();
import multer from "multer";
import { getUser, postUser, loginUser } from "../controllers/userController.js";
router.route("/postuser").post(postUser);
router.route("/getuser").post(getUser);
router.route("/loginuser").post(loginUser);

export default router;
