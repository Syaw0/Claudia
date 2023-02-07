import { Request, Response } from "express";
import path from "path";

const __cwd = process.cwd();

const downloadRoute = (req: Request, res: Response) => {
  try {
    const { cwd, fileName } = req.query;
    const downloadPath = path.join(
      __cwd,
      "/server/static/cloud/",
      `${cwd}/`,
      fileName as string
    );
    res.download(downloadPath, fileName as string);
  } catch (err) {
    console.log(err);
    res.send({ status: false, msg: "error in download Route" });
  }
};
export default downloadRoute;
