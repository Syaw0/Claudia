import { SHA256 } from "crypto-js";
import baseUrl from "./baseUrl";

const signup = async (signupData: any) => {
  const { name, email, password } = signupData[0];
  console.log("im in signup", name, email, password);
  let hashedPassword = SHA256(password).toString();

  const resp = await fetch(baseUrl + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password: hashedPassword }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default signup;
