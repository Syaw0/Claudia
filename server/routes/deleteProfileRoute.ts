import changeProfileUrl from "../../db/util/changeProfileUrl";
import { Request, Response } from "express";

const deleteProfileRoute = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const result = await changeProfileUrl(userId, "default");
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error during delete profile route" });
  }
};

export default deleteProfileRoute;
