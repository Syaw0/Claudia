import logout from "../../db/util/logout";
import { Request, Response } from "express";

const logoutRoute = async (req: Request, res: Response) => {
  try {
    const result = await logout(req.cookies.session, res);
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error in logout route" });
  }
};

export default logoutRoute;
