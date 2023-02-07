import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import { SHA256 } from "crypto-js";
import { pool, redisClient } from "../../db/dbController";
import redisCheckAndConnect from "../../db/util/redisCheckAndConnect";
import cookieParser from "cookie-parser";
import checkForSignupRoute from "../../server/routes/checkForSignup";

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
app.post("/checkForSignup", checkForSignupRoute);

const userData = {
  name: "siavash",
  email: "siaw@gmail.com",
  password: SHA256("rootroot").toString(),
};

const email = `ssss${userData.email}`;
describe("TEST END POINT : Login Router", () => {
  let FormedEmail = email.split(".").join("");
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
  it("if user email address is not in the db set tfa session ", async () => {
    let result = await request(app)
      .post("/checkForSignup")
      .send({ email: email });
    expect(result.body.status).toBeTruthy();
    await redisCheckAndConnect(redisClient);
    await redisClient.select(2);
    const isExist = await redisClient.hGet(FormedEmail, "token");
    expect(isExist).not.toBeNull();
  });
  it("if user email is exist return false", async () => {
    let result = await request(app)
      .post("/checkForSignup")
      .send({ email: userData.email });
    expect(result.body.status).toBeFalsy();
  });
});
