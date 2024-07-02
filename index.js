import express from "express";
import { connectMongo } from "./connection.js";
import { urlrouter } from "./route/url.js";
import { userRouter } from "./route/user.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { URL } from "./model/url.js";
import { authenticateUserRole, isUserValid } from "./middelware/auth.js";
import cookieParser from "cookie-parser";
import  'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "view")));

app.use(cookieParser());

connectMongo()
  .then(() => console.log("mongodb is connect successfullt!!!"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(isUserValid)


app.use("/url", urlrouter);
app.use("/user", userRouter);

app.get("/", authenticateUserRole(['NORMAL']), (req, res) => {
  res.sendFile(path.join(__dirname, "view", "url", "index.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "signup", "index.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "login", "index.html"));
});

app.get("/api/urlData",isUserValid, async (req, res) => {
  if (!req.user) return 
  const userId = req.user._id;
  const urlData = await URL.find({
    owner:userId
  });
  console.log(urlData,"urlData");

  res.json(urlData);
});


app.listen(port, () => console.log("server is running at port", port));
