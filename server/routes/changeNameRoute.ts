import { Request, Response } from "express";
import changeName from "../../db/util/changeName";

const changeNameRoute = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const newName = req.body.newName;
    const result = await changeName(newName, userId);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error during change name route" });
  }
};
export default changeNameRoute;
