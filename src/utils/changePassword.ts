import { SHA256 } from "crypto-js";
import baseUrl from "./baseUrl";

const changePassword = async (
  changePasswordData: [x: string, y: string, z: string]
) => {
  const userId = changePasswordData[0];
  const previousPassword = SHA256(changePasswordData[1]).toString();
  const newPassword = SHA256(changePasswordData[2]).toString();

  const resp = await fetch(baseUrl + "/changePassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, previousPassword, newPassword }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default changePassword;
