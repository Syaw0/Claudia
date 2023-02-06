import fs from "fs";
import path from "path";
const __cwd = process.cwd();

const mkdir = ({ name, cwd }: any) => {
  const basePath = path.join(__cwd, "/server/static/cloud/", `${cwd}`);
  let ls = fs.readdirSync(basePath);
  ls = ls.filter((fname: string) => fname === name);
  if (ls.length != 0) {
    return { status: false, msg: "directory with same name exist" };
  }

  fs.mkdirSync(basePath + `/${name}`);
  return { status: true, msg: "created successfully" };
};

export default mkdir;
