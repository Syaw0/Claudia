import move from "../util/move";
import { Request, Response } from "express";

const moveRoute = (req: Request, res: Response) => {
  try {
    const { cwd, init, dest } = req.body;
    const result = move(cwd, init, dest);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in move route" });
  }
};

export default moveRoute;
