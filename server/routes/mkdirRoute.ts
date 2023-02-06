import { Request, Response } from "express";
import mkdir from "../../server/util/mkdir";

const mkdirRoute = (req: Request, res: Response) => {
  try {
    const result = mkdir(req.body);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send({ status: false, msg: "error in mkdir route" });
  }
};

export default mkdirRoute;
