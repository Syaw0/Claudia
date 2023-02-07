import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import renameRoute from "../../server/routes/renameRoute";

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
app.post("/rename", renameRoute);

describe("TEST END POINT : Remove File", () => {
  // if newFilename exist server will return false
  // else just rename that

  const basePathCloud = path.join(process.cwd(), "/server/static/cloud/");
  const basePathTest = path.join(process.cwd(), "/tests/server/static/x.txt");

  beforeEach(() => {
    fs.rmSync(basePathCloud + "1", { recursive: true, force: true });
    fs.mkdirSync(basePathCloud + "1");
    fs.mkdirSync(basePathCloud + "1/another");
    fs.cpSync(basePathTest, basePathCloud + "1/x.txt", { force: true });
    fs.cpSync(basePathTest, basePathCloud + "1/another/x.txt", { force: true });
  });

  it("take cwd and filename and newname and just rename it", async () => {
    const res = await request(app)
      .post("/rename")
      .send({ cwd: "1", fileName: "x.txt", newName: "newName.txt" });
    expect(res.body.status).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/x.txt")).toBeFalsy();
    expect(fs.existsSync(basePathCloud + "1/newName.txt")).toBeTruthy();

    const res2 = await request(app)
      .post("/rename")
      .send({ cwd: "1/another", fileName: "x.txt", newName: "newName2.txt" });
    expect(res2.body.status).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/another/x.txt")).toBeFalsy();
    expect(
      fs.existsSync(basePathCloud + "1/another/newName2.txt")
    ).toBeTruthy();

    const res3 = await request(app)
      .post("/rename")
      .send({ cwd: "1", fileName: "another", newName: "someMagicDir" });
    expect(res3.body.status).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/another")).toBeFalsy();
    expect(fs.existsSync(basePathCloud + "1/someMagicDir")).toBeTruthy();
  });

  it("if name exist just return false", async () => {
    const res = await request(app)
      .post("/rename")
      .send({ cwd: "1", fileName: "x.txt", newName: "x.txt" });
    expect(res.body.status).toBeFalsy();
    expect(fs.existsSync(basePathCloud + "1/x.txt")).toBeTruthy();
  });
});
