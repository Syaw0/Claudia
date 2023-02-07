import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import mkdirRoute from "../../server/routes/mkdirRoute";

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
app.post("/mkdir", mkdirRoute);

describe("TEST END POINT : Mkdir Route", () => {
  // if directory with same name exits return error

  const basePathCloud = path.join(process.cwd(), "/server/static/cloud/");

  beforeEach(() => {
    fs.rmSync(basePathCloud + "1", { recursive: true, force: true });
    fs.mkdirSync(basePathCloud + "1");
    fs.mkdirSync(basePathCloud + "1/another");
  });

  it("just take an cwd and name and create new one", async () => {
    const res = await request(app)
      .post("/mkdir")
      .send({ cwd: "1", name: "someDir" });
    expect(res.body.status).toBeTruthy();
    expect(fs.existsSync(basePathCloud + "1/someDir")).toBeTruthy();
  });
  it("if the name is exist return falsa", async () => {
    const res = await request(app)
      .post("/mkdir")
      .send({ cwd: "1", name: "another" });
    expect(res.body.status).toBeFalsy();
  });
});
