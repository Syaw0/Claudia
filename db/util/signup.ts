import { pool } from "../../db/dbController";

const signup = async ({ name, password, email }: any) => {
  let con;
  try {
    con = await pool.getConnection();
    await con.query(`INSERT INTO users (name,email,password) VALUES(?,?,?)`, [
      name,
      email,
      password,
    ]);
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
