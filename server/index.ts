import express from "express";
import next from "next";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { redisClient } from "../db/dbController";
import loginRoute from "./routes/loginRoute";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(async () => {
    await redisClient.connect();
    await redisClient.select(2);
    const app = express();
    app.use(express.static(__dirname + "/static"));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.post("/login", loginRoute);

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
