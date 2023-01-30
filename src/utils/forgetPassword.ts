const forgetPassword = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "forget password session set!",
  };
};

export const loaderMsg = "please wait until server response";
export default forgetPassword;
