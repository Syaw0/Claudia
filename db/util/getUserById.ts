import { pool } from "../../db/dbController";

const getUserById = async (id: string) => {
  let con;
  try {
    con = await pool.getConnection();
    const user = await con.query(`SELECT * FROM users WHERE userId="${id}"`);
    if (user.length == 0) {
      return { status: false, msg: "user is not exist" };
    }
    return { status: true, msg: "user found", data: user[0] };
  } catch (err) {
    return {
      status: false,
      msg: "error during get user data from maria",
    };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default getUserById;
