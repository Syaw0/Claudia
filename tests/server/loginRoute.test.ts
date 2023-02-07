import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import { SHA256 } from "crypto-js";
import { pool, redisClient } from "../../db/dbController";
import redisCheckAndConnect from "../../db/util/redisCheckAndConnect";
import cookieParser from "cookie-parser";
import loginRoute from "../../server/routes/loginRoute";
import nodemailer from "nodemailer";

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn(() => new Promise((res) => res(true))),
  })),
}));

let mockNodemailer = nodemailer.createTransport().sendMail as jest.Mock;

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
app.post("/login", loginRoute);

const userData = {
  name: "siavash",
  email: "siaw@gmail.com",
  password: SHA256("rootroot").toString(),
};

describe("TEST END POINT : Login Router", () => {
  // 1.check if session is set in the redis then:
  //    -if set just remove it  and clear cookies
  //    -if not return error
  beforeAll(async () => {
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

  it("if reset session set just change password", async () => {
    let result = await request(app)
      .post("/login")
      .send({ email: userData.email, password: userData.password });
    expect(result.body.status).toBeTruthy();
    // now redis has an tfa token
    await redisCheckAndConnect(redisClient);
    await redisClient.select(2);
    const formatEmail = userData.email.split(".").join("");
    let isSessionSet = await redisClient.hmGet(formatEmail, "token");
    expect(isSessionSet).not.toBeNull();

    // also we set an timeout for 10 min to remove thi session

    // isSessionSet = await redisClient.hmGet(formatEmail, "token");
    // expect(isSessionSet).toBeNull();
  });
  it("if information doesn't match return false", async () => {
    let result = await request(app)
      .post("/login")
      .send({ email: "belabela", password: userData.password });
    expect(result.body.status).toBeFalsy;

    let result2 = await request(app)
      .post("/login")
      .send({ email: userData.email, password: "else" });
    expect(result2.body.status).toBeFalsy;
  });
});
