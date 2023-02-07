import { pool } from "../../db/dbController";

const changeName = async (newName: string, userId: string) => {
  let con;
  try {
    con = await pool.getConnection();
    await con.query(
      `UPDATE users SET name="${newName}" WHERE userId=${userId}`
    );
    return { status: true, msg: "successfully update name" };
  } catch (err) {
    return { status: false, msg: "error during change name of user" };
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default changeName;
