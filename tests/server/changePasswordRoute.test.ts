import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import { SHA256 } from "crypto-js";
import { pool } from "../../db/dbController";
import cookieParser from "cookie-parser";
import changePasswordRoute from "../../server/routes/changePasswordRoute";

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
app.post("/changePassword", changePasswordRoute);
const prePass = SHA256("rootroot").toString();
const nextPass = SHA256("123123123").toString();
const userData = {
  name: "siavash",
  email: "siaw@gmail.com",
  password: prePass,
};

describe("TEST END POINT : Change Password Router", () => {
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
        `UPDATE users SET password="${prePass}" WHERE email="${userData.email}"`
      );
    }
    await con.end();
  });

  it("take an pre pass and next and userId then change pass", async () => {
    let con = await pool.getConnection();
    const res = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    let result = await request(app).post("/changePassword").send({
      userId: res[0].userId,
      previousPassword: prePass,
      newPassword: nextPass,
    });
    expect(result.body.status).toBeTruthy();
    const res2 = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    expect(res2[0].password).toEqual(nextPass);
    await con.end();
  });
  it("if pre pass does not match return false", async () => {
    let con = await pool.getConnection();
    const res = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    let result = await request(app).post("/changePassword").send({
      userId: res[0].userId,
      previousPassword: "some wrong pass",
      newPassword: nextPass,
    });
    expect(result.body.status).toBeFalsy();
    await con.end();
  });
});
