import { pool } from "../../db/dbController";

const changeProfileUrl = async (userId: string) => {
  let con;
  try {
    con = await pool.getConnection();
    await con.query(
      `UPDATE users SET profileUrl="/prof/${userId}" WHERE userId=${userId}`
    );
    return { status: true, msg: "successfully change url in maria" };
  } catch (err) {
    return { status: false, msg: "error during set new profile url in maria" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default changeProfileUrl;
