const checkLoginForm = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "the email and password match",
  };
};

export const loaderMsg = "please wait until server response.";
export default checkLoginForm;
