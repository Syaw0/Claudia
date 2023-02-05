import { SHA256 } from "crypto-js";
import baseUrl from "./baseUrl";

const resetPassword = async (resetData: any) => {
  const { password, email } = resetData[0];
  let hashedPassword = SHA256(password).toString();
  const resp = await fetch(baseUrl + "/resetPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password: hashedPassword }),
  });
  const data = await resp.json();

  return data;
};

export const loaderMsg = "please wait until server response.";
export default resetPassword;
