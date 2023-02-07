import { Request, Response } from "express";
import listAllFilesInDirectory from "../../server/util/listAllFilesInDirectory";
import getUsedVolume from "../../server/util/getUsedVolume";

const updateFileListRoute = async (req: Request, res: Response) => {
  try {
    const cwd = req.query.cwd as string;
    let id: any = cwd.split("/")[0];
    const ls = listAllFilesInDirectory(cwd as string);
    const size = getUsedVolume(id);
    res.send({
      status: true,
      msg: "updateSuccessful",
      data: {
        files: ls,
        storageUsage: {
          max: 10000,
          min: size,
        },
      },
    });
  } catch (err) {
    res.send({ status: false, msg: "error in updateFileList Route " });
  }
};

export default updateFileListRoute;
