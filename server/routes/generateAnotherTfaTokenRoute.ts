import setFreshTfaToken from "../../db/util/setFreshTfaToken";
import { Request, Response } from "express";

const generateAnotherTfaTokenRoute = async (req: Request, res: Response) => {
  try {
    let result = await setFreshTfaToken(req.body.email);
    res.send(result);
  } catch (err) {
    res.send({
      status: false,
      msg: "error during generate new tfa token route",
    });
  }
};

export default generateAnotherTfaTokenRoute;
