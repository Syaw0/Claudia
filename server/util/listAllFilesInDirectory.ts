import fs from "fs";
import path from "path";
import getUsedVolume from "./getUsedVolume";
interface FileData {
  name: string;
  size: number;
  date: string;
  isDirectory: boolean;
}
let __cwd = process.cwd();
const listAllFilesInDirectory = (dirPath: string): FileData[] => {
  let baseDir = path.resolve(__cwd + "/server/static/cloud/" + `${dirPath}`);
  const files = fs.readdirSync(baseDir);
  let list: any = [];

  files.forEach((f) => {
    const stat = fs.statSync(baseDir + `/${f}`);
    const isDirectory = stat.isDirectory();
    let size;
    if (isDirectory) {
      size = Number(getUsedVolume(dirPath + `/${f}`)) * 10 ** 6;
    } else {
      size = stat.size;
    }
    const date = stat.mtime.toLocaleString();
    list.push({ name: f, size, isDirectory, date });
  });
  return list;
};

export default listAllFilesInDirectory;
