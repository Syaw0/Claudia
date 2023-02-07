import baseUrl from "./baseUrl";

const deleteProfile = async (deleteProfileData: [x: string]) => {
  const userId = deleteProfileData[0];
  const resp = await fetch(baseUrl + "/deleteProfile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default deleteProfile;
