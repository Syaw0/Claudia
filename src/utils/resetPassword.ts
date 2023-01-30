const resetPassword = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "password reset successfully",
  };
};

export const loaderMsg = "please wait until server response.";
export default resetPassword;
