import mongoose from "mongoose";
const user = new mongoose.Schema({
  u_gid: {
    type: String,
    required: true,
  },
  u_name: {
    type: String,
    required: true,
  },
  u_email: {
    type: String,
    required: true,
  },
  u_bio: {
    type: String,
    default: "",
  },
  u_fb: {
    type: String,
    default: "",
  },
  u_prof: {
    type: String,
    default: "",
  },

  u_toc: {
    date: { type: String },
    time: { type: String },
  },
});

const userSchema = mongoose.model("users", user);

export default userSchema;
