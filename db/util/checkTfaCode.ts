import { SHA256 } from "crypto-js";
import { Response } from "express";
import { pool, redisClient } from "../../db/dbController";
import redisCheckAndConnect from "./redisCheckAndConnect";
import setLoginSession from "./setLoginSession";

const checkTfaCode = async (body: any, res: Response) => {
  let con;
  try {
    const { email, otp, isReset } = body;
    await redisCheckAndConnect(redisClient);
    await redisClient.select(2);
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
        const res = await redisClient.set(email, "exist");
        console.log(res);
      } else {
        con = await pool.getConnection();
        let user = await con.query(
          `SELECT * FROM users WHERE email="${email}"`
        );
        // ! it may cause problem if not found?
        await setLoginSession(email, user[0].userId);
        res.cookie("session", SHA256(email).toString(), {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
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
