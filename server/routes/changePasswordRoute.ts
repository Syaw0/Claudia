import changePassword from "../../db/util/changePassword";
import { Request, Response } from "express";

const changePasswordRoute = async (req: Request, res: Response) => {
  try {
    const { userId, previousPassword, newPassword } = req.body;
    const result = await changePassword(userId, previousPassword, newPassword);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in change password route" });
  }
};

export default changePasswordRoute;
