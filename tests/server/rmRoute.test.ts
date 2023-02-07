import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import rmRoute from "../../server/routes/rmRoute";

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
app.post("/rm", rmRoute);

describe("TEST END POINT : Remove File", () => {
  const basePathCloud = path.join(process.cwd(), "/server/static/cloud/");
  const basePathTest = path.join(process.cwd(), "/tests/server/static/x.txt");

  beforeEach(() => {
    if (!fs.existsSync(basePathCloud + "1")) {
      fs.mkdirSync(basePathCloud + "1");
    }
    if (!fs.existsSync(basePathCloud + "1/another")) {
      fs.mkdirSync(basePathCloud + "1/another");
    }
    fs.cpSync(basePathTest, basePathCloud + "1/x.txt", { force: true });
    fs.cpSync(basePathTest, basePathCloud + "2/x.txt", { force: true });
  });

  it("just take cwd and file name and remove it recursively", async () => {
    const res = await request(app).post("/rm").send({
      cwd: "1",
      filename: "x.txt",
    });
    expect(res.body).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/x.txt")).toBeFalsy();
    const res2 = await request(app).post("/rm").send({
      cwd: "1/another",
      filename: "x.txt",
    });
    expect(res2.body).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/another/x.txt")).toBeFalsy();

    const res3 = await request(app).post("/rm").send({
      cwd: "1",
      filename: "another",
    });
    expect(res3.body).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/another")).toBeFalsy();
  });
});
