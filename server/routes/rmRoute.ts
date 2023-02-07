import { Request, Response } from "express";
import rm from "../../server/util/rm";
const rmRoute = (req: Request, res: Response) => {
  try {
    const { cwd, filename } = req.body;
    const result = rm(cwd, filename);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in rm route" });
  }
};

export default rmRoute;
