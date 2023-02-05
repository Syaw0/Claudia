import { redisClient } from "../../db/dbController";
import redisCheckAndConnect from "./redisCheckAndConnect";

const checkTfaCode = async ({ email, otp, isReset }: any) => {
  try {
    await redisCheckAndConnect(redisClient);
    let formedEmail = email.split(".").join("");
    const sessionInfo = await redisClient.hGetAll(formedEmail);
    if (Number(sessionInfo.try) == 3) {
      return {
        status: false,
        msg: "your tfa session is departure",
      };
    }

    await redisClient.hIncrBy(formedEmail, "try", 1);
    if (sessionInfo.token == otp) {
      if (isReset) {
        await redisClient.select(3);
        // set reset password token
        await redisClient.set(email, "");
      }
      await redisClient.del(formedEmail);
      return {
        status: true,
        msg: "otp is correct",
      };
    } else {
      return {
        status: false,
        msg: `otp is not correct you have ${
          3 - Number(sessionInfo.try)
        } chance. `,
      };
    }
  } catch (err) {
    return {
      status: false,
      msg: "error during tfa code check",
    };
  }
};

export default checkTfaCode;
