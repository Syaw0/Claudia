import baseUrl from "./baseUrl";

const logout = async () => {
  const resp = await fetch(baseUrl + "/logout");
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default logout;
