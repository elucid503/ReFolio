import express from 'express';
import path from 'path';

import { createRouter } from "express-file-routing";

const app = express();

app.use(express.static('../Frontend/'));

await createRouter(app, { directory: path.join(process.cwd(), "/Routes") });

app.listen(50015, () => {
  console.log('Server is running on http://localhost:50015');
});