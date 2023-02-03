import Express from "express";
import mongoose from "mongoose";
import connectDb from "./db/connectDb.js";
import cors from "cors";

import configRoutes from "./routes/configRoutes.js";
const App = Express();
connectDb();
App.use(cors());
App.listen(3000, () => {
  console.log("Server is running on port 3000");
});
App.use(Express.json());

App.use("/v1/api/config", configRoutes);

export default App;
