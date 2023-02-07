import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import { SHA256 } from "crypto-js";
import { pool, redisClient } from "../../db/dbController";
import redisCheckAndConnect from "../../db/util/redisCheckAndConnect";
import cookieParser from "cookie-parser";
import forgetPasswordRoute from "../../server/routes/forgetPasswordRoute";

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
app.post("/forgetPassword", forgetPasswordRoute);

describe("TEST END POINT : Forget Password Router", () => {
  const userData = {
    name: "siavash",
    email: "siaw@gmail.com",
    password: SHA256("rootroot").toString(),
  };
  let FormedEmail = userData.email.split(".").join("");
  beforeEach(async () => {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(2);
    await redisClient.del(FormedEmail);
    let con = await pool.getConnection();
    const res = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    if (res.length == 0) {
      await con.query(`INSERT INTO users (name,email,password) values(?,?,?)`, [
        userData.name,
        userData.email,
        userData.password,
      ]);
    }
    await con.end();
  });

  it("if email is set in db set tfa session", async () => {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(2);
    const token = await redisClient.hGet(FormedEmail, "token");
    const tryNumber = await redisClient.hGet(FormedEmail, "try");
    expect(token).toBeNull();
    expect(tryNumber).toBeNull();

    const result = await request(app)
      .post("/forgetPassword")
      .send({ email: userData.email });
    expect(result.body.status).toBeTruthy();

    const token2 = await redisClient.hGet(FormedEmail, "token");
    const tryNumber2 = await redisClient.hGet(FormedEmail, "try");
    expect(token2).not.toBeNull();
    expect(tryNumber2).not.toBeNull();
  });
  it("if email is not set in db return false", async () => {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(2);
    const token = await redisClient.hGet(FormedEmail, "token");
    const tryNumber = await redisClient.hGet(FormedEmail, "try");
    expect(token).toBeNull();
    expect(tryNumber).toBeNull();

    const result = await request(app)
      .post("/forgetPassword")
      .send({ email: "belabela" });
    expect(result.body.status).toBeFalsy();

    const token2 = await redisClient.hGet(FormedEmail, "token");
    const tryNumber2 = await redisClient.hGet(FormedEmail, "try");
    expect(token2).toBeNull();
    expect(tryNumber2).toBeNull();
  });
});
