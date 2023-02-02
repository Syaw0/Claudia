const move = async () => {
  const resp = await fetch("");
  // const data = await resp.json()
  return {
    status: true,
    msg: "move Was successful",
  };
};

export const loaderMsg = "please wait until server response.";
export default move;
