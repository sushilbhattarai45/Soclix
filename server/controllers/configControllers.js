import configSchema from "../models/configModels.js";
import moment from "moment";

export const postConfig = async (req, res) => {
  const c_toc = {
    date: moment().format("ll"),
    time: moment().format("LT"),
  };
  try {
    console.log(req.body);
    const data = new configSchema({
      u_id: req.body.u_id,
      fb_appId: req.body.fb_appId,
      fb_access: req.body.fb_access,
      c_toc: c_toc,
    });
    await data.save();
    res.status(200).json({ status: 200, message: "Config Posted" });
  } catch (err) {
    console.log({ err: "Error" });
  }
};
export const getConfig = async (req, res) => {
  try {
    const data = await configSchema.find({ u_id: req.body.u_id });

    res.status(200).json({ status: 200, data: data, message: "Config Posted" });
  } catch (err) {
    console.log({ err: "Error" });
  }
};
