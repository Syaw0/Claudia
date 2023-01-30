const checkOtpToken = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "otp is correct",
  };
};

export const loaderMsg = "please wait until server response.";
export default checkOtpToken;
