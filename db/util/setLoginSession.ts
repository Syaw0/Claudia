import { SHA256 } from "crypto-js";
import { redisClient } from "../../db/dbController";
import redisCheckAndConnect from "./redisCheckAndConnect";

const setLoginSession = async (email: string, id: string) => {
  try {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(1);
    await redisClient.set(SHA256(email).toString(), `${id}`);
    return { status: true, msg: "successfully install the login session" };
  } catch (err) {
    return {
      status: false,
      msg: "error during set login session",
    };
  }
};

export default setLoginSession;
