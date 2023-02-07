const checkImageForProfile = (file: File) => {
  if (file.size > 2 * 10 ** 6) {
    return { status: false, msg: "the size of image is more than 2MGB" };
  }
  return { status: true, msg: "it ok" };
};
export default checkImageForProfile;
