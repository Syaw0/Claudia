const rename = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "rename is successful",
  };
};

export const loaderMsg = "please wait until server response.";
export default rename;
