const changeName = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "change name was successful",
  };
};

export const loaderMsg = "please wait until server response.";
export default changeName;
