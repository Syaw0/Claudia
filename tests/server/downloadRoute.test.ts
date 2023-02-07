import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import downloadRoute from "../../server/routes/downloadRoute";
import fs from "fs";
import path from "path";

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
app.get("/download", downloadRoute);

describe("TEST END POINT : Download Router", () => {
  const basePathCloud = path.join(process.cwd(), "/server/static/cloud/");
  const basePathTest = path.join(process.cwd(), "/tests/server/static/x.txt");

  fs.rmSync(basePathCloud + "1", { recursive: true, force: true });
  fs.mkdirSync(basePathCloud + "1");
  fs.mkdirSync(basePathCloud + "1/another");
  fs.cpSync(basePathTest, basePathCloud + "1/x.txt", { force: true });
  fs.cpSync(basePathTest, basePathCloud + "1/another/x.txt", { force: true });

  it("take cwd and filename and download it", async () => {
    const result = await request(app).get("/download?cwd=1&fileName=x.txt");
    expect(result.headers["content-disposition"]).toEqual(
      'attachment; filename="x.txt"'
    );
  });
});
