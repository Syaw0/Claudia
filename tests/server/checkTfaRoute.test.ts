import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import { SHA256 } from "crypto-js";
import { redisClient } from "../../db/dbController";
import redisCheckAndConnect from "../../db/util/redisCheckAndConnect";
import cookieParser from "cookie-parser";
import checkTfaTokenRoute from "../../server/routes/checkTfaTokenRoute";

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
app.post("/checkTfaToken", checkTfaTokenRoute);

describe("TEST END POINT : Check Tfa Route ", () => {
  const userData = {
    name: "siavash",
    email: "siaw@gmail.com",
    password: SHA256("rootroot").toString(),
    profileUrl: "/prof/1",
  };
  let FormedEmail = userData.email.split(".").join("");
  const hashedEmail = SHA256(userData.email).toString();
  const token = 123123;
  beforeEach(async () => {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(1);
    const isSessionSet = await redisClient.del(hashedEmail);
    await redisClient.select(2);
    await redisClient.hSet(FormedEmail, "token", `${token}`);
    await redisClient.hSet(FormedEmail, "try", `0`);
  });

  it("check token for login", async () => {
    const res = await request(app).post("/checkTfaToken").send({
      email: userData.email,
      otp: token,
      isReset: false,
      isSignup: false,
    });

    expect(res.body.status).toBeTruthy();
    await redisCheckAndConnect(redisClient);
    await redisClient.select(1);
    const isSessionSet = await redisClient.get(hashedEmail);
    expect(isSessionSet).not.toBeNull();

    expect(res.headers["set-cookie"]).not.toBeNull();

    await redisClient.select(2);
    const isTfaSessionDeleted = await redisClient.hGet(FormedEmail, "token");
    expect(isTfaSessionDeleted).toBeNull();
  });

  it("we have only 3 time to check otp", async () => {
    const res = await request(app).post("/checkTfaToken").send({
      email: userData.email,
      otp: 1,
      isReset: false,
      isSignup: false,
    });

    expect(res.body.status).toBeFalsy();
    await request(app).post("/checkTfaToken").send({
      email: userData.email,
      otp: 1,
      isReset: false,
      isSignup: false,
    });
    expect(res.body.status).toBeFalsy();
    await request(app).post("/checkTfaToken").send({
      email: userData.email,
      otp: 1,
      isReset: false,
      isSignup: false,
    });
    expect(res.body.status).toBeFalsy();
    const res2 = await request(app).post("/checkTfaToken").send({
      email: userData.email,
      otp: 1,
      isReset: false,
      isSignup: false,
    });
    expect(res2.body.status).toBeFalsy();
    expect(res2.body.msg).toEqual("your tfa session is departure");
  });
  it("if it come from sign up do not set cookie", async () => {
    const res = await request(app).post("/checkTfaToken").send({
      email: userData.email,
      otp: token,
      isReset: false,
      isSignup: true,
    });

    expect(res.body.status).toBeTruthy();
    await redisCheckAndConnect(redisClient);
    await redisClient.select(1);
    const isSessionSet = await redisClient.get(hashedEmail);
    expect(isSessionSet).toBeNull();

    expect(res.headers["set-cookie"]).toBeUndefined();

    await redisClient.select(2);
    const isTfaSessionDeleted = await redisClient.hGet(FormedEmail, "token");
    expect(isTfaSessionDeleted).toBeNull();
  });
  it("if it come from reset set reset session", async () => {
    const res = await request(app).post("/checkTfaToken").send({
      email: userData.email,
      otp: token,
      isReset: true,
      isSignup: true,
    });

    expect(res.body.status).toBeTruthy();
    await redisCheckAndConnect(redisClient);
    await redisClient.select(1);
    const isSessionSet = await redisClient.get(hashedEmail);
    expect(isSessionSet).toBeNull();

    expect(res.headers["set-cookie"]).toBeUndefined();

    await redisClient.select(2);
    const isTfaSessionDeleted = await redisClient.hGet(FormedEmail, "token");
    expect(isTfaSessionDeleted).toBeNull();

    await redisClient.select(3);
    const isResetSessionSet = await redisClient.get(userData.email);
    expect(isResetSessionSet).not.toBeNull();
  });
});
