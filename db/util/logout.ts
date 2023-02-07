import { redisClient } from "../../db/dbController";
import { Response } from "express";
import redisCheckAndConnect from "./redisCheckAndConnect";

const logout = async (session: string, res: Response) => {
  try {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(1);
    const delSessionResult = await redisClient.del(session);
    if (!delSessionResult) {
      return { status: false, msg: "session key not found in redis" };
    }
    res.clearCookie("session");
    return { status: true, msg: "session cleared completely" };
  } catch (err) {
    return { status: false, msg: "error in logout" };
  }
};

export default logout;
