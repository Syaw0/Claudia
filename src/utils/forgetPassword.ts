import baseUrl from "./baseUrl";

const forgetPassword = async (forgetPasswordData: any) => {
  const { email } = forgetPasswordData[0];
  const resp = await fetch(baseUrl + "/forgetPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await resp.json();

  return data;
};

export const loaderMsg = "please wait until server response";
export default forgetPassword;
