import Express from "express";
import { router as Router } from "express-file-routing";

import { Port } from "./Config.json";

const App = Express();

App.use(await Router({ directory: "./Routes" }));
App.use(Express.static("../Frontend/"));

App.listen(Port)
console.log(`[INFO] Server is running on port ${Port}`)
