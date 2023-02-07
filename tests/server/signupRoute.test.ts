import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import signupRoute from "../../server/routes/signupRoute";
import { SHA256 } from "crypto-js";
import { pool } from "../../db/dbController";
import fs from "fs";
import path from "path";

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
app.post("/signup", signupRoute);

const __cwd = process.cwd();

describe("TEST END POINT : Sign up", () => {
  const baseCloudPath = path.join(__cwd, "/server/static/cloud/");
  const email = "someMagicEmail2@gmail.com";
  beforeEach(async () => {
    let con = await pool.getConnection();
    if (con != null) {
      let isExist = await con.query(
        `SELECT * FROM users WHERE email="${email}"`
      );
      if (isExist.length != 0) {
        fs.rmSync(baseCloudPath + isExist[0].userId, {
          recursive: true,
          force: true,
        });
        await con.query(`DELETE FROM users WHERE email="${email}"`);
      }
    }
  });

  it("just provide data and then sign up will be done", async () => {
    // * the important point of signup route is that
    // * when its called we sure that email come from that is unique.
    const res = await request(app)
      .post("/signup")
      .send({
        name: "sia",
        email,
        password: SHA256("rootroot").toString(),
      });
    expect(res.body.status).toBeTruthy();
    let con = await pool.getConnection();
    let userId = await con.query(`SELECT * FROM users WHERE email="${email}"`);
    expect(userId.length).toBeGreaterThan(0);
    expect(fs.existsSync(baseCloudPath + userId[0].userId)).toBeTruthy();
    await con.end();
  });

  it("if any error happen server return false", async () => {
    // * the important point of signup route is that
    // * when its called we sure that email come from that is unique.
    const res = await request(app)
      .post("/signup")
      .send({
        email,
        password: SHA256("rootroot").toString(),
      });
    expect(res.body.status).toBeFalsy();
  });
});
