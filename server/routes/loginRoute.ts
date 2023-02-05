import login from "../../db/util/login";
import { Request, Response } from "express";
import { redisClient } from "../../db/dbController";
import redisCheckAndConnect from "../../db/util/redisCheckAndConnect";

const loginRoute = async (req: Request, res: Response) => {
  try {
    await redisCheckAndConnect(redisClient);
    const loginResult = await login(req.body);

    if (loginResult.status) {
      // here must initial the tfa session
      await redisClient.select(2);
      // now set a tfa token and send email !
    }
    return loginResult;
  } catch (err) {
    return {
      status: false,
      msg: "error during perform any action in login route",
    };
  }
};

export default loginRoute;
