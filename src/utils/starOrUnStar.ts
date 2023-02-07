const starOrUnStar = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "give star successful",
  };
};

export const loaderMsg = "please wait until server response.";
export default starOrUnStar;
