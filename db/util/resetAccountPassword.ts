import { pool, redisClient } from "../../db/dbController";
import redisCheckAndConnect from "./redisCheckAndConnect";

const resetAccountPassword = async ({ email, password }: any) => {
  let con;
  try {
    await redisCheckAndConnect(redisClient);
    await redisClient.select(2);

    let resetSession = await redisClient.get(email);
    if (resetSession == null) {
      return {
        status: false,
        msg: "reset session is not set please try again",
      };
    }
    await redisClient.del(email);
    con = await pool.getConnection();

    con.query(
      `UPDATE users  SET  password="${password}" WHERE email="${email}"`
    );
    return {
      status: true,
      msg: "successfully update password",
    };
  } catch (err) {
    return {
      status: false,
      msg: "error during reset password",
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default resetAccountPassword;
