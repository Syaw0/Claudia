import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import { SHA256 } from "crypto-js";
import { pool } from "../../db/dbController";
import cookieParser from "cookie-parser";
import changeNameRoute from "../../server/routes/changeNameRoute";

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
app.post("/changeName", changeNameRoute);
const name = "Siavash";
const newName = "HAJI";
const userData = {
  name: name,
  email: "siaw@gmail.com",
  password: SHA256("rootroot").toString(),
};

describe("TEST END POINT : Change Name Route", () => {
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
        `UPDATE users SET name="${userData.name}" WHERE email="${userData.email}"`
      );
    }
    await con.end();
  });

  it("take userId and newName and just rename it", async () => {
    let con = await pool.getConnection();
    const res = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    let result = await request(app).post("/changeName").send({
      userId: res[0].userId,
      newName: newName,
    });
    expect(result.body.status).toBeTruthy();
    const res2 = await con.query(
      `SELECT * from users WHERE email="${userData.email}"`
    );
    expect(res2[0].name).toEqual(newName);
    await con.end();
  });
  it("if any error happen return false", async () => {
    let result = await request(app).post("/changeName").send({
      userId: "some falsy id",
      newName: newName,
    });
    expect(result.body.status).toBeFalsy();
  });
});
