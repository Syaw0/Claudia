import { pool } from "../../db/dbController";

const changeProfileUrl = async (userId: string, url?: string) => {
  let con;
  try {
    con = await pool.getConnection();
    let profUrl = url == null ? userId : url;
    console.log(profUrl, "sss");
    await con.query(
      `UPDATE users SET profileUrl="/prof/${profUrl}" WHERE userId=${userId}`
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
