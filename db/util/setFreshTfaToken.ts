import { redisClient } from "../../db/dbController";
import transporter from "../../server/util/mailTransporter";
import dotEnv from "dotenv";
import random from "../../server/util/random";

dotEnv.config();
const CoEmail = process.env.CoEmail;

const setFreshTfaToken = async (email: string) => {
  // here must initial the tfa session
  try {
    await redisClient.select(2);
    let randomNum = random(100000, 1000000);
    let FormedEmail = email.split(".").join(""); // when store . in redis hash we got error
    await redisClient.hSet(FormedEmail, "token", `${randomNum}`);
    await redisClient.hSet(FormedEmail, "try", `0`);

    setTimeout(async () => {
      // set the timeout to del session after 10min
      await redisClient.del(FormedEmail);
    }, 600 * 1000);

    // then send email
    await transporter.sendMail({
      from: CoEmail,
      to: email,
      subject: "Two Factor Authentication",
      html: `<p>${randomNum}</p>`, // TODO write template for it
    });
    return { status: true, msg: "successfully generate new Token" };
  } catch (err) {
    return {
      status: false,
      msg: "error during set Token",
    };
  }
};

export default setFreshTfaToken;
