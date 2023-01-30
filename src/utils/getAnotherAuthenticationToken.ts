const getAnotherAuthenticationToken = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "send it",
  };
};

export const getAnotherAuthTokenLoaderMsg =
  "please wait until server response.";
export default getAnotherAuthenticationToken;
