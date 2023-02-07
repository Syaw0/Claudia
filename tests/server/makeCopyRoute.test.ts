import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import makeCopyRoute from "../../server/routes/makeCopyRoute";

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
app.post("/makeCopy", makeCopyRoute);

describe("TEST END POINT : MakeCopy Route", () => {
  const basePathCloud = path.join(process.cwd(), "/server/static/cloud/");
  const basePathTest = path.join(process.cwd(), "/tests/server/static/x.txt");

  beforeEach(() => {
    fs.rmSync(basePathCloud + "1", { recursive: true, force: true });
    fs.mkdirSync(basePathCloud + "1");
    fs.mkdirSync(basePathCloud + "1/another");
    fs.cpSync(basePathTest, basePathCloud + "1/x.txt", { force: true });
    fs.cpSync(basePathTest, basePathCloud + "1/another/x.txt", { force: true });
  });

  it("take an cwd and filename and duplicate it", async () => {
    const res = await request(app)
      .post("/makeCopy")
      .send({ cwd: "1", name: "x.txt" });
    expect(res.body.status).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/x(2).txt")).toBeTruthy();

    const res2 = await request(app)
      .post("/makeCopy")
      .send({ cwd: "1", name: "x.txt" });
    expect(res2.body.status).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/x(3).txt")).toBeTruthy();
  });

  it("if any error happen server response error", async () => {
    const res = await request(app)
      .post("/makeCopy")
      .send({ cwd: "1", name: "x1414.txt" }); // file is not exist
    expect(res.body.status).toBeFalsy();
  });
});
