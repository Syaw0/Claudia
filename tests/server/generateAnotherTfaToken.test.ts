import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import { SHA256 } from "crypto-js";
import { redisClient } from "../../db/dbController";
import redisCheckAndConnect from "../../db/util/redisCheckAndConnect";
import cookieParser from "cookie-parser";
import generateAnotherTfaTokenRoute from "../../server/routes/generateAnotherTfaTokenRoute";
import random from "../../server/util/random";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn(() => new Promise((res) => res(true))),
  })),
}));

const app = express();
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    methods: "*",
    allowedHeaders: "*",
    origin: "*",
    preflightContinue: false,
    exposedHeaders: ["Content-Disposition"],
  })
);
app.post("/generateAnotherTfaToken", generateAnotherTfaTokenRoute);

describe("TEST END POINT : Generate Fresh Tfa Token Router", () => {
  // 1.check if session is set in the redis then:
  //    -if set just remove it  and clear cookies
  //    -if not return error
  const userData = {
    name: "siavash",
    email: "siaw@gmail.com",
    password: SHA256("rootroot").toString(),
  };

  let FormedEmail = userData.email.split(".").join("");
  beforeEach(async () => {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(2);
    let randomNum = random(100000, 1000000);
    await redisClient.hSet(FormedEmail, "token", `${randomNum}`);
    await redisClient.hSet(FormedEmail, "try", `3`);
  });

  it("generate another tfa session just with email", async () => {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(2);
    const token = await redisClient.hGet(FormedEmail, "token");
    const tryNumber = await redisClient.hGet(FormedEmail, "try");
    expect(tryNumber).toEqual("3");

    const result = await request(app)
      .post("/generateAnotherTfaToken")
      .send({ email: userData.email });
    expect(result.body.status).toBeTruthy();
    const newToken = await redisClient.hGet(FormedEmail, "token");
    const newTryNumber = await redisClient.hGet(FormedEmail, "try");
    expect(newTryNumber).toEqual("0");
    expect(token).not.toEqual(newToken);
  });
});
