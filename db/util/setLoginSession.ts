import { redisClient } from "../../db/dbController";
import redisCheckAndConnect from "./redisCheckAndConnect";

const setLoginSession = async (email: string) => {
  try {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(1);

    await redisClient.set(email, "");
    return { status: true, msg: "successfully install the login session" };
  } catch (err) {
    return {
      status: false,
      msg: "error during set login session",
    };
  }
};

export default setLoginSession;
