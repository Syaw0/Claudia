import resetAccountPassword from "../../db/util/resetAccountPassword";
import { Request, Response } from "express";

const resetPasswordRoute = async (req: Request, res: Response) => {
  try {
    let result = await resetAccountPassword(req.body);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in reset password route" });
  }
};

export default resetPasswordRoute;
