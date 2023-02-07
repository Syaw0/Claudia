import express from "express";
import uploadRoute from "../../server/routes/uploadRoute";
import request from "supertest";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
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
app.use(fileUpload());
app.post("/upload", uploadRoute);

describe("TEST END POINT : UploadRoute", () => {
  afterEach(() => {
    const fileName = "x.txt";
    const filePath = path.resolve(__dirname, `./static/${fileName}`);
    const uploadPath = path.resolve(
      __dirname,
      `../../server/static/cloud/1/${fileName}`
    );
    if (fs.existsSync(uploadPath)) {
      fs.rmSync(uploadPath, { force: true });
    }
  });
  it("we must send file and cwd and this endpoint will receive our file and move it to its cloud", async () => {
    const fileName = "x.txt";
    const filePath = path.resolve(__dirname, `./static/${fileName}`);
    const res = await request(app)
      .post("/upload")
      .field("cwd", "1")
      .attach("file", filePath);
    expect(res.body.status).toBeTruthy();
    const uploadPath = path.resolve(
      __dirname,
      `../../server/static/cloud/1/${fileName}`
    );
    expect(fs.existsSync(uploadPath)).toBeTruthy();
  });
  it("if file not provided or cwd server return falsy result", async () => {
    const fileName = "x.txt";
    const filePath = path.resolve(__dirname, `./static/${fileName}`);
    const res = await request(app).post("/upload").field("cwd", "1");
    // .attach("file", filePath);
    expect(res.body.status).toBeFalsy();
    const uploadPath = path.resolve(
      __dirname,
      `../../server/static/cloud/1/${fileName}`
    );
    expect(fs.existsSync(uploadPath)).toBeFalsy();

    const res2 = await request(app)
      .post("/upload")
      // .field("cwd", "1")
      .attach("file", filePath);

    expect(res2.body.status).toBeFalsy();
    expect(fs.existsSync(uploadPath)).toBeFalsy();
  });
});
