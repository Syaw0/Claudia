import { SHA256 } from "crypto-js";
import baseUrl from "./baseUrl";

const checkLoginForm = async (loginData: any) => {
  const email = loginData[0].loginForm_emailInput;
  const password = SHA256(loginData[0].loginForm_emailInput).toString();

  const resp = await fetch(baseUrl + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default checkLoginForm;
