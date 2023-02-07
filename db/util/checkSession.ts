import { redisClient } from "../../db/dbController";
import redisCheckAndConnect from "./redisCheckAndConnect";

const checkSession = async (cookie: any) => {
  if (cookie && cookie.session != null) {
    try {
      await redisCheckAndConnect(redisClient);
      await redisClient.select(1);
      const result = await redisClient.get(cookie.session);
      if (result == null) {
        return { status: false, msg: "session is not exist" };
      }
      return { status: true, msg: "its exist", data: result };
    } catch (err) {
      return { status: false, msg: "error during get session from redis" };
    }
  }
  return {
    status: false,
    msg: "cookie is not provided",
  };
};

export default checkSession;
