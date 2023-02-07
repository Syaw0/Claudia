import fs from "fs";
import path from "path";

const __cwd = process.cwd();

const isDirectoryExist = (dir: string) => {
  const basePath = path.join(__cwd, "/server/static/cloud/");

  try {
    const isExist = fs.existsSync(basePath + `${dir}`);
    if (isExist) {
      return { status: true, msg: "directory exits" };
    }
    return { status: false, msg: "directory is not exits" };
  } catch (err) {
    return { status: false, msg: "error during check directory existence" };
  }
};
export default isDirectoryExist;
