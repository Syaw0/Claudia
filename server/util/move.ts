import path from "path";
import fs from "fs";

const __cwd = process.cwd();
const move = (cwd: string, init: string, dest: string) => {
  try {
    const basePath = path.join(__cwd, "/server/static/cloud/", `${cwd}/`);
    fs.renameSync(basePath + init, basePath + `${dest}/${init}`);
    return { status: true, msg: "moved successfully" };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "error in move" };
  }
};
export default move;
