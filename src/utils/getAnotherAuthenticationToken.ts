import baseUrl from "./baseUrl";

const getAnotherAuthenticationToken = async (emailData: any) => {
  const email = emailData[0];
  const resp = await fetch(baseUrl + "/generateAnotherTfaToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await resp.json();
  return data;
};

export const getAnotherAuthTokenLoaderMsg =
  "please wait until server response.";
export default getAnotherAuthenticationToken;
