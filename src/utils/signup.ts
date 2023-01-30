const signup = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "the account created",
  };
};

export const loaderMsg = "please wait until server response.";
export default signup;
