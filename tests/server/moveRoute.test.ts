import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import moveRoute from "../../server/routes/moveRoute";

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
app.post("/move", moveRoute);

describe("TEST END POINT : Move Route", () => {
  // if we move some file into another directory
  // if some file with same name exist choose another name for it

  const basePathCloud = path.join(process.cwd(), "/server/static/cloud/");
  const basePathTest = path.join(process.cwd(), "/tests/server/static/x.txt");

  beforeEach(() => {
    fs.rmSync(basePathCloud + "1", { recursive: true, force: true });
    fs.mkdirSync(basePathCloud + "1");
    fs.mkdirSync(basePathCloud + "1/another");
    fs.mkdirSync(basePathCloud + "1/another2");
    fs.cpSync(basePathTest, basePathCloud + "1/x.txt", { force: true });
    fs.cpSync(basePathTest, basePathCloud + "1/another/x.txt", { force: true });
  });

  it("take an cwd and name of file or directory and destination and move it", async () => {
    const res = await request(app)
      .post("/move")
      .send({ cwd: "1", init: "x.txt", dest: "another" });

    expect(res.body.status).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/x.txt")).toBeFalsy();
    expect(fs.existsSync(basePathCloud + "1/another/x(2).txt")).toBeTruthy();

    const res2 = await request(app)
      .post("/move")
      .send({ cwd: "1", init: "another", dest: "another2" });

    expect(res2.body.status).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/another")).toBeFalsy();
    expect(fs.existsSync(basePathCloud + "1/another2/another")).toBeTruthy();
  });
  it("if any error happen server response false", async () => {
    // something like if directory not found or ...
    const res = await request(app)
      .post("/move")
      .send({ cwd: "1", init: "x.txt", dest: "IMNOTHERE" });

    expect(res.body.status).toBeFalsy();
  });
});
