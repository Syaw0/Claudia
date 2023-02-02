const makeCopy = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "copy is successful",
  };
};

export const loaderMsg = "please wait until server response.";
export default makeCopy;
