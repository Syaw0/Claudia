import baseUrl from "./baseUrl";

const checkOtpToken = async (tfaData: any) => {
  const [otp, isReset, email, isSignup] = tfaData;

  const resp = await fetch(baseUrl + `/checkTfaToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otp, isReset, email, isSignup }),
  });
  const data = await resp.json();
  console.log(data);
  return data;
};

export const loaderMsg = "please wait until server response.";
export default checkOtpToken;
