import mongoose from "mongoose";
const config = new mongoose.Schema({
  u_id: {
    type: String,
    required: true,
  },
  fb_appId: {
    type: String,
    default: "",
  },
  fb_access: {
    type: String,
    default: "",
  },
  c_toc: {
    date: { type: String },
    time: { type: String },
  },
});

const configSchema = mongoose.model("config", config);

export default configSchema;
