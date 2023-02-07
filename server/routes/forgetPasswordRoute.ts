import forgetPassword from "../../db/util/forgetPassword";
import { Request, Response } from "express";

const forgetPasswordRoute = async (req: Request, res: Response) => {
  try {
    let result = await forgetPassword(req.body.email);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error during forgetPassword route" });
  }
};

export default forgetPasswordRoute;
