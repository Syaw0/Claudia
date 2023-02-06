import fs from "fs";
import path from "path";
import listAllFilesInDirectory from "./listAllFilesInDirectory";

let __cwd = process.cwd();

const getUsedVolume = (dirPath: string) => {
  let myPath = dirPath;
  let sizes: any = [];
  const recursive = (whichPath: string) => {
    const ls = listAllFilesInDirectory(whichPath);
    ls.forEach((f) => {
      if (f.isDirectory) {
        recursive(whichPath + "/" + f.name);
      } else {
        sizes.push(f.size);
      }
    });
  };

  recursive(myPath);
  if (sizes.length == 0) {
    return 0;
  }
  const size: number = sizes.reduce((p: number, n: number) => n + p);
  return (size * 10 ** -6).toFixed(2);
};

export default getUsedVolume;
