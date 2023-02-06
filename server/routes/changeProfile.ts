import changeProfile from "../util/changeProfile";
import { Request, Response } from "express";

const changeProfileRoute = async (req: Request, res: Response) => {
  try {
    const file = req.files as any;
    const userId = req.body.userId;
    const userProf = req.body.userProf;
    const result = await changeProfile(file.file, userId, userProf);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error during change profile route" });
  }
};

export default changeProfileRoute;
