import { SHA256 } from "crypto-js";
import { Response } from "express";
import { pool } from "../../db/dbController";
import setLoginSession from "./setLoginSession";

const signup = async (signupData: any, res: Response) => {
  let con;
  try {
    const { name, password, email } = signupData;
    con = await pool.getConnection();
    await con.query(`INSERT INTO users (name,email,password) VALUES(?,?,?)`, [
      name,
      email,
      password,
    ]);
    let newUser = await con.query(`SELECT * FROM users WHERE email="${email}"`);
    if (newUser.length == 0) {
      return { status: false, msg: "user is not created" };
    }

    await setLoginSession(email, newUser.userId);
    res.cookie("session", SHA256(email).toString(), {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return { status: true, msg: "successfully created" };
  } catch (err) {
    return { status: false, msg: "error during set new user" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};
export default signup;
