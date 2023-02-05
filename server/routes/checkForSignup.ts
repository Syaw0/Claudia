import checkForSignup from "../../db/util/checkForSignup";
import { Request, Response } from "express";

const checkForSignupRoute = async (req: Request, res: Response) => {
  try {
    let result = await checkForSignup(req.body);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in signupRoute" });
  }
};

export default checkForSignupRoute;
