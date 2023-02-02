const remove = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "remove was successful",
  };
};

export const loaderMsg = "please wait until server response.";
export default remove;
