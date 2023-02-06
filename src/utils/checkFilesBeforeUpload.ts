const checkFilesBeforeUpload = (
  files: FileList | null,
  storageUsage: {
    max: number;
    min: number;
  }
) => {
  if (files == null) {
    return { status: false, msg: "no file selected!" };
  }
  let size = 0;
  for (let i = 0; i != files.length; i++) {
    size += files[i].size;
  }

  let usedSizeWithUploads = storageUsage.min * 10 ** 6 + size;
  let isBigger = usedSizeWithUploads >= storageUsage.max * 10 ** 6;

  if (isBigger) {
    return {
      status: false,
      msg: "chooses files size is bigger than your storage capacity ",
    };
  }

  return { status: true, msg: "check its ok" };
};

export default checkFilesBeforeUpload;
