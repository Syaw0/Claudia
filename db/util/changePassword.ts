import { pool } from "../../db/dbController";

const changePassword = async (
  userId: string,
  previousPassword: string,
  newPassword: string
) => {
  let con;
  try {
    con = await pool.getConnection();

    // first check password
    let isExist = await con.query(
      `SELECT * FROM users WHERE password="${previousPassword}" and userId="${userId}"`
    );
    if (isExist.length == 0) {
      return { status: false, msg: "password is not correct" };
    }

    await con.query(
      `UPDATE users SET password="${newPassword}" WHERE userId=${userId}`
    );
    return { status: true, msg: "successfully change password" };
  } catch (err) {
    return { status: false, msg: "error during change password in maria" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default changePassword;
