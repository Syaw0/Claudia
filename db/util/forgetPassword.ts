import { pool } from "../../db/dbController";
import setFreshTfaToken from "./setFreshTfaToken";

const forgetPassword = async (email: string) => {
  let con;
  try {
    con = await pool.getConnection();
    let isExist = await con.query(`SELECT * FROM users WHERE email="${email}"`);
    if (isExist.length == 0) {
      return { status: false, msg: "email is not exist" };
    }
    await setFreshTfaToken(email);
    return { status: true, msg: "successfully create tfa token" };
    //generate tfa token
  } catch (err) {
    return {
      status: false,
      msg: "error in operation",
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default forgetPassword;
