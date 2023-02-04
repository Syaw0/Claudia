const changeProfile = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "change was successful",
  };
};

export const loaderMsg = "please wait until server response.";
export default changeProfile;
