import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import resetPasswordRoute from "../../server/routes/resetPasswordRoute";
import { SHA256 } from "crypto-js";
import { pool, redisClient } from "../../db/dbController";
import redisCheckAndConnect from "../../db/util/redisCheckAndConnect";

const app = express();
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(
  cors({
    methods: "*",
    allowedHeaders: "*",
    origin: "*",
    preflightContinue: false,
    exposedHeaders: ["Content-Disposition"],
  })
);
app.post("/resetPassword", resetPasswordRoute);

describe("TEST END POINT : ResetPassword Router", () => {
  // 1.check if reset session is set or not
  //    -if its set remove it and reset password
  //    -if its not return error

  const prePass = SHA256("rootroot").toString();
  const newPass = SHA256("123123123").toString();
  const userData = {
    name: "siavash",
    email: "siaw@gmail.com",
    password: prePass,
  };
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
    } else {
      await con.query(
        `UPDATE users set password="${prePass}" where email="${userData.email}"`
      );
    }
    await con.end();
  });
  beforeEach(async () => {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(3);
    await redisClient.set(userData.email, "");
    let con = await pool.getConnection();
    await con.query(
      `UPDATE users set password="${prePass}" where email="${userData.email}"`
    );
    await con.end();
  });

  it("if reset session set just change password", async () => {
    const res = await request(app)
      .post("/resetPassword")
      .send({ email: userData.email, password: newPass });
    expect(res.body.status).toBeTruthy();
    let con = await pool.getConnection();
    let user = await con.query(
      `SELECT * FROM users where email="${userData.email}"`
    );
    expect(user[0].password).toEqual(newPass);
    await con.end();
  });

  it("if reset session is not exist return false", async () => {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(3);
    await redisClient.del(userData.email);
    const res = await request(app)
      .post("/resetPassword")
      .send({ email: userData.email, password: newPass });

    expect(res.body.status).toBeFalsy();
    let con = await pool.getConnection();
    let user = await con.query(
      `SELECT * FROM users where email="${userData.email}"`
    );
    expect(user[0].password).toEqual(prePass);
    await con.end();
  });
});
