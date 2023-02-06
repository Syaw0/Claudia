import rename from "../util/rename";
import { Request, Response } from "express";

const renameRoute = (req: Request, res: Response) => {
  try {
    const { cwd, fileName, newName } = req.body;
    const result = rename(cwd, fileName, newName);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in rename route" });
  }
};

export default renameRoute;
