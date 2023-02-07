import fs from "fs";
import path from "path";

const __cwd = process.cwd();

const rename = (cwd: string, fileName: string, newName: string) => {
  try {
    const basePath = path.join(__cwd, "/server/static/cloud/", `${cwd}/`);
    if (fs.existsSync(basePath + newName)) {
      return { status: false, msg: "the name is exist" };
    }
    fs.renameSync(basePath + fileName, basePath + newName);

    return { status: true, msg: "renamed correctly" };
  } catch (err) {
    return { status: false, msg: "error in rename" };
  }
};

export default rename;
