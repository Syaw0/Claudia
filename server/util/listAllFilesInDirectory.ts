import fs from "fs";
import path from "path";
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
    const size = stat.size;
    const modifiedTime = stat.mtime.getUTCDate();
    list.push({ name: f, size, isDirectory, modifiedTime });
  });
  return list;
};

export default listAllFilesInDirectory;
