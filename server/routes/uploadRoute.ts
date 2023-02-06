import { Request, Response } from "express";
import moveFilesToCloud from "../../server/util/moveFilesToCloud";

const uploadRoute = (req: Request, res: Response) => {
  try {
    const cwd = req.body.cwd;
    const files = req.files;
    const result = moveFilesToCloud(files, cwd);
    res.send(result);
  } catch (err) {
    res.send({
      status: false,
      msg: "error in upload route",
    });
  }
};

export default uploadRoute;
