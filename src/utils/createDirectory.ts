const createDirectory = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "creation was successful",
  };
};

export const loaderMsg = "please wait until server response.";
export default createDirectory;
