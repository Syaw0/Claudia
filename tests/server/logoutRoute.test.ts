import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import { SHA256 } from "crypto-js";
import { redisClient } from "../../db/dbController";
import redisCheckAndConnect from "../../db/util/redisCheckAndConnect";
import logoutRoute from "../../server/routes/logoutRoute";
import cookieParser from "cookie-parser";

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
app.get("/logout", logoutRoute);

describe("TEST END POINT : Logout Router", () => {
  // 1.check if session is set in the redis then:
  //    -if set just remove it  and clear cookies
  //    -if not return error
  const userData = {
    name: "siavash",
    email: "siaw@gmail.com",
    password: SHA256("rootroot").toString(),
  };

  const hashedEmail = SHA256(userData.email).toString();
  beforeEach(async () => {
    await redisCheckAndConnect(redisClient);
    redisClient.select(1);
    redisClient.set(SHA256(userData.email).toString(), "");
  });

  it("if reset session set just change password", async () => {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(1);
    let isSessionSet = await redisClient.get(hashedEmail);
    expect(isSessionSet).not.toBeNull();

    const res = await request(app)
      .get("/logout")
      .set("Cookie", [`session=${hashedEmail}`]);
    expect(res.headers["set-cookie"][0]).toContain("session=; Path=/");
    expect(res.body.status).toBeTruthy();
    isSessionSet = await redisClient.get(hashedEmail);
    expect(isSessionSet).toBeNull();
  });

  it("if reset session not set return error ", async () => {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(1);
    let isSessionSet = await redisClient.del(hashedEmail);
    expect(isSessionSet).not.toBeNull();

    const res = await request(app)
      .get("/logout")
      .set("Cookie", [`session=${hashedEmail}`]);
    expect(res.body.status).toBeFalsy();
  });
});
