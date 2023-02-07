import { pool, redisClient } from "../dbController";
import dotEnv from "dotenv";
import redisCheckAndConnect from "./redisCheckAndConnect";
import random from "../../server/util/random";
import transporter from "../../server/util/mailTransporter";
dotEnv.config();
const CoEmail = process.env.CoEmail;

const checkForSignup = async ({ email }: any) => {
  let con;
  try {
    await redisCheckAndConnect(redisClient);
    con = await pool.getConnection();
    let isEmailExist = await con.query(
      `SELECT * FROM users WHERE email="${email}"`
    );
    if (isEmailExist.length != 0) {
      return {
        status: false,
        msg: "email exist",
      };
    }
    // here must initial the tfa session
    await redisClient.select(2);
    let randomNum = random(100000, 1000000);
    let formedEmail = email.split(".").join(""); // when store . in redis hash we got error
    await redisClient.hSet(formedEmail, "token", `${randomNum}`);
    await redisClient.hSet(formedEmail, "try", `0`);

    setTimeout(async () => {
      // set the timeout to del session after 10min
      await redisClient.del(formedEmail);
    }, 600 * 1000);

    // then send email
    await transporter.sendMail({
      from: CoEmail,
      to: email,
      subject: "Two Factor Authentication",
      html: `<p>${randomNum}</p>`, // TODO write template for it
    });

    return { status: true, msg: "successfully create tfa session" };
  } catch (err) {
  } finally {
    if (con != null) {
      await con.end();
    }
  }
};

export default checkForSignup;
