import express from "express";
import next from "next";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { redisClient } from "../db/dbController";
import loginRoute from "./routes/loginRoute";
import checkTfaToken from "./routes/checkTfaToken";
import checkForSignupRoute from "./routes/checkForSignup";
import signupRoute from "./routes/signupRoute";
import generateAnotherTfaTokenRoute from "./routes/generateAnotherTfaTokenRoute";
import resetPasswordRoute from "./routes/resetPasswordRoute";
import forgetPasswordRoute from "./routes/forgetPasswordRoute";
import uploadRoute from "./routes/uploadRoute";
import fileUpload from "express-fileupload";
import updateFileListRoute from "./routes/updateFileListRoute";
import mkdirRoute from "./routes/mkdirRoute";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(async () => {
    await redisClient.connect();
    const app = express();
    app.use(express.static(__dirname + "/static"));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(fileUpload());
    // app.use("*", async (req, res, next) => {
    //   await redisClient.select(1);
    //   console.log(req.cookies.session);
    //   console.log(await redisClient.get(req.cookies.session));
    //   next();
    // });
    app.post("/login", loginRoute);
    app.post("/checkTfaToken", checkTfaToken);
    app.post("/checkForSignup", checkForSignupRoute);
    app.post("/signup", signupRoute);
    app.post("/generateAnotherTfaToken", generateAnotherTfaTokenRoute);
    app.post("/resetPassword", resetPasswordRoute);
    app.post("/forgetPassword", forgetPasswordRoute);
    app.post("/upload", uploadRoute);
    app.get("/updateFileList", updateFileListRoute);
    app.post("/mkdir", mkdirRoute);
    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(port, () => {
      console.log(`listen on ${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
