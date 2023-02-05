import baseUrl from "./baseUrl";

const checkForSignup = async (signupData: any) => {
  const email = signupData[0].signupForm_emailInput;

  const resp = await fetch(baseUrl + "/checkForSignup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await resp.json();

  return data;
};

export const loaderMsg = "please wait until server response.";
export default checkForSignup;
