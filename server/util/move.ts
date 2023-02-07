import path from "path";
import fs from "fs";

const __cwd = process.cwd();
const move = (cwd: string, init: string, dest: string) => {
  try {
    const basePath = path.join(__cwd, "/server/static/cloud/", `${cwd}/`);
    let newName: any = init;
    if (fs.existsSync(basePath + `${dest}/${init}`)) {
      newName = init.split(".");
      let num = 2;
      newName[0] = `${newName[0]}(${num})`;
      newName = newName.join(".");
      while (fs.existsSync(basePath + `${dest}/${newName}`) == true) {
        // ! Can do better ?
        // ! some constant time algorithm?
        newName = init.split(".");
        num += 1;
        newName[0] = `${newName[0]}(${num})`;
        newName = newName.join(".");
      }
    }

    fs.renameSync(basePath + init, basePath + `${dest}/${newName}`);
    return { status: true, msg: "moved successfully" };
  } catch (err) {
    return { status: false, msg: "error in move" };
  }
};
export default move;
