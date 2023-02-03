import userSchema from "../models/userModels.js";
import moment from "moment";

export const postUser = async (req, res) => {
  const u_toc = {
    date: moment().format("ll"),
    time: moment().format("LT"),
  };
  try {
    console.log(req.body);
    const data = new userSchema({
      u_gid: req.body.u_gid,
      u_name: req.body.u_name,
      u_email: req.body.u_email,
      u_bio: req.body.u_bio,
      u_fb: req.body.u_fb,
      u_prof: req.body.u_prof,
      u_toc: u_toc,
    });
    await data.save();
    res.status(200).json({ status: 200, message: "Data Posted", data: data });
  } catch (err) {
    console.log({ err: "Error" });
  }
};
export const getUser = async (req, res) => {
  try {
    const data = await userSchema.find({ u_gid: req.body.u_gid });
    res.status(200).json({ status: 200, data: data });
  } catch (err) {
    console.log({ err: "Error" });
  }
};
