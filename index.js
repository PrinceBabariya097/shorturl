import express from "express";
import { connectMongo } from "./connection.js";
import { router } from "./route/url.js";
import cors from 'cors'

const app = express();
const port = 5500;

app.use(cors())

connectMongo()
  .then(() => console.log("mongodb is connect successfullt!!!"))
  .catch((err) => console.error(err));

app.listen(port, () => console.log("server is running at port", port));
app.use(express.json())
app.use('/url', router)