import { Request, Response } from "express";
import checkTfaCode from "../../db/util/checkTfaCode";

const checkTfaToken = async (req: Request, res: Response) => {
  try {
    const result = await checkTfaCode(req.body);

    res.send(result);
  } catch (err) {
    res.send({
      status: false,
      msg: "error in checkTfaToken",
    });
  }
};

export default checkTfaToken;
