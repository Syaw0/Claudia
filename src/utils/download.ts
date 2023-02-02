const download = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "download is begin",
  };
};

export const loaderMsg = "please wait until server response.";
export default download;
