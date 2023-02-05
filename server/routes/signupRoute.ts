import signup from "../../db/util/signup";
import { Request, Response } from "express";

const signupRoute = async (req: Request, res: Response) => {
  try {
    let result = await signup(req.body);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error during signup" });
  }
};

export default signupRoute;
