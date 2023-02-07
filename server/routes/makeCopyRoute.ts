import makeCopy from "../util/makeCopy";
import { Request, Response } from "express";

const makeCopyRoute = (req: Request, res: Response) => {
  try {
    const cwd = req.body.cwd;
    const name = req.body.name;
    const result = makeCopy(cwd, name);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in make copy route" });
  }
};
export default makeCopyRoute;
