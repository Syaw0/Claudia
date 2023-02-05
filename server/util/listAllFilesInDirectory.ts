import fs from "fs";
import path from "path";

let __dirname = process.cwd();

const listAllFilesInDirectory = (dirPath: string): FileData[] => {
  let baseDir = path.resolve(__dirname + "/server/static/cloud/" + dirPath);
  const files = fs.readdirSync(baseDir);

  let list: any = [];

  files.forEach((f) => {
    const stat = fs.statSync(baseDir + `/${f}`);
    const isDirectory = stat.isDirectory();
    const size = stat.size;
    const modifiedTime = stat.mtime.getUTCDate();
    list.push({ name: f, size, isDirectory, modifiedTime });
  });
  return list;
};

export default listAllFilesInDirectory;
