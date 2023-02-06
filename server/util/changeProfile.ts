import changeProfileUrl from "../../db/util/changeProfileUrl";
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

const __cwd = process.cwd();

const changeProfile = async (
  file: UploadedFile,
  userId: string,
  userProf: string
) => {
  try {
    const basePath = path.join(__cwd, "/server/static/profile/");
    await file.mv(basePath + `${userId}`);

    if (userProf == "/prof/default.png") {
      const result = await changeProfileUrl(userId);
      if (!result.status) {
        return result;
      }
    }
    return { status: true, msg: "its set successfully" };
  } catch (err) {
    console.log(err);
    return { status: false, msg: "error during change profile" };
  }
};

export default changeProfile;
