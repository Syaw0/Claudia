import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cors from "cors";

import updateFileListRoute from "../../server/routes/updateFileListRoute";

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
app.get("/updateFileList", updateFileListRoute);

describe("TEST END POINT : Update File List Route", () => {
  it("just provide cwd and then server return a list of files in it", async () => {
    const res = await request(app).get("/updateFileList?cwd=1");
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.files).not.toBeUndefined();
    expect(res.body.data.files).not.toBeUndefined();
  });
  it("if cwd is not exist return false", async () => {
    const res = await request(app).get("/updateFileList?cwd=12313123123123");
    expect(res.body.status).toBeFalsy();
    expect(res.body.data).toBeUndefined();
    expect(res.body.data).toBeUndefined();
  });
});
