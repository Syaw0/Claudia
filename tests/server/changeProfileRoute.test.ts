import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import { SHA256 } from "crypto-js";
import { pool } from "../../db/dbController";
import fs from "fs";
import path from "path";
import changeProfileRoute from "../../server/routes/changeProfileRoute";
import expressFileUpload from "express-fileupload";

const app = express();
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(expressFileUpload());
app.use(
  cors({
    methods: "*",
    allowedHeaders: "*",
    origin: "*",
    preflightContinue: false,
    exposedHeaders: ["Content-Disposition"],
  })
);
app.post("/changeProfile", changeProfileRoute);

const __cwd = process.cwd();
const userData = {
  name: "siavash",
  email: "siaw@gmail.com",
  password: SHA256("rootroot").toString(),
};
describe("TEST END POINT : ChangeProfile route", () => {
  const baseCloudPath = path.join(__cwd, "/server/static/cloud/");

  beforeEach(async () => {
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
        `UPDATE users set profileUrl="/prof/default" where email="${userData.email}"`
      );
    }
    await con.end();
  });

  it("just provide data and then sign up will be done", async () => {
    let con = await pool.getConnection();
    const user = await con.query(
      `SELECT * FROM users where email="${userData.email}"`
    );
    expect(user[0].profileUrl).toEqual("/prof/default");

    const filePath = path.resolve(__dirname, `./static/x.txt`);
    const res = await request(app)
      .post("/changeProfile")
      .field("userId", user[0].userId)
      .field("userProf", "/prof/default")
      .attach("file", filePath);
    expect(res.body.status).toBeTruthy();
    const user2 = await con.query(
      `SELECT * FROM users where email="${userData.email}"`
    );
    expect(user2[0].profileUrl).toEqual(`/prof/${user2[0].userId}`);
  });

  it("of any error happen return false", async () => {
    let con = await pool.getConnection();
    const user = await con.query(
      `SELECT * FROM users where email="${userData.email}"`
    );
    expect(user[0].profileUrl).toEqual("/prof/default");

    const res = await request(app)
      .post("/changeProfile")
      .field("userId", user[0].userId)
      .field("userProf", "/prof/default");
    // .attach("file", filePath);
    expect(res.body.status).toBeFalsy();
  });
});
