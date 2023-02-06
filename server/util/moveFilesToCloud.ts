import { readdirSync } from "fs";
import path from "path";
interface UploadedFile {
  name: string;
  mv(path: string, callback: (err: any) => void): void;
  mv(path: string): Promise<void>;
  encoding: string;
  mimetype: string;
  data: Buffer;
  tempFilePath: string;
  truncated: boolean;
  size: number;
  md5: string;
}
const currentWorkingDir = process.cwd();

const moveFilesToCloud = (files: any, cwd: string) => {
  try {
    const basePath = path.join(currentWorkingDir, "/server/static/cloud/", cwd);
    if (files == null) {
      return { status: false, msg: "no file is presented" };
    }
    const ls = readdirSync(basePath);

    let listOfFileKeys = Object.keys(files);
    listOfFileKeys.forEach(async (key) => {
      ls.forEach(async (name: string) => {
        let file: UploadedFile = files[key];
        let fileName = file.name;
        if (name === files[key].name) {
          let SplittedName = fileName.split(".");
          // TODO what if file has not an extension!?
          let format = SplittedName[SplittedName.length - 1];
          let rest = SplittedName.slice(0, SplittedName.length - 1).join(".");
          rest += "(2)";
          fileName = rest + "." + format;
        }
        let path = basePath + `/${fileName}`;
        await file.mv(path);
      });
    });
    return {
      status: true,
      msg: "all files uploaded successfully",
    };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "error during transform files in cloud" };
  }
};
export default moveFilesToCloud;
