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

    // TODO what happen if file is duplicated?? we must give another name for it

    let listOfFileKeys = Object.keys(files);
    listOfFileKeys.forEach(async (key) => {
      let file: UploadedFile = files[key];
      await file.mv(basePath + `/${file.name}`);
    });
    return {
      status: true,
      msg: "all files uploaded successfully",
    };
  } catch (err) {
    return { status: false, msg: "error during transform files in cloud" };
  }
};
export default moveFilesToCloud;
