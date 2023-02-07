import fs from "fs";
import path from "path";

const __cwd = process.cwd();
const rm = (cwd: string, filename: string) => {
  try {
    const basePath = path.join(__cwd, "/server/static/cloud/", `${cwd}/`);
    fs.rmSync(basePath + filename, { force: true, recursive: true });
    return { status: true, msg: "remove successfully" };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "error in rm" };
  }
};

export default rm;
