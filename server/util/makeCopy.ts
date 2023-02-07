import fs from "fs";
import path from "path";

const __cwd = process.cwd();

const makeCopy = (cwd: string, name: string) => {
  try {
    const basePath = path.join(__cwd, "/server/static/cloud/", `${cwd}`);
    let newName: any = name.split(".");
    let num = 2;
    newName[0] = `${newName[0]}(${num})`;
    newName = newName.join(".");
    while (fs.existsSync(basePath + `/${newName}`) == true) {
      // ! Can do better ?
      // ! some constant time algorithm?
      newName = name.split(".");
      num += 1;
      newName[0] = `${newName[0]}(${num})`;
      newName = newName.join(".");
    }

    fs.cpSync(basePath + `/${name}`, basePath + `/${newName}`, {
      force: true,
      recursive: true,
    });
    return { status: true, msg: "create copy successfully" };
  } catch (err) {
    return { status: false, msg: "error in make copy" };
  }
};

export default makeCopy;
