import { mkdirSync } from "fs";
import path from "path";

const createCloudForNewUser = (id: string) => {
  try {
    mkdirSync(path.join(__dirname + `/../static/cloud/${id}`));
    return { status: true, msg: "create cloud successfully" };
  } catch (err) {
    return { status: false, msg: "error during create empty cloud" };
  }
};

export default createCloudForNewUser;
