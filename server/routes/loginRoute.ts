import login from "../../db/util/login";
import { Request, Response } from "express";
import { redisClient } from "../../db/dbController";
import redisCheckAndConnect from "../../db/util/redisCheckAndConnect";
import random from "../../server/util/random";
import transporter from "../../server/util/mailTransporter";
import dotEnv from "dotenv";
dotEnv.config();
const CoEmail = process.env.CoEmail;

const loginRoute = async (req: Request, res: Response) => {
  try {
    await redisCheckAndConnect(redisClient);
    const loginResult = await login(req.body);

    if (loginResult.status) {
      // here must initial the tfa session
      await redisClient.select(2);
      let randomNum = random(100000, 1000000);
      let email = req.body.email;
      email = email.split(".").join(""); // when store . in redis hash we got error
      await redisClient.hSet(email, "token", `${randomNum}`);
      await redisClient.hSet(email, "try", `0`);

      setTimeout(async () => {
        // set the timeout to del session after 10min
        await redisClient.del(email);
      }, 600 * 1000);

      // then send email
      await transporter.sendMail({
        from: CoEmail,
        to: email,
        subject: "Two Factor Authentication",
        html: `<p>${randomNum}</p>`, // TODO write template for it
      });
    }
    return res.send(loginResult);
  } catch (err) {
    console.log(err);
    return res.send({
      status: false,
      msg: "error during perform any action in login route",
    });
  }
};

export default loginRoute;
