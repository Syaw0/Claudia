import baseUrl from "./baseUrl";

const changeProfile = async (
  changeProfileData: [x: File, y: string, z: string]
) => {
  const file = changeProfileData[0];
  const userId = changeProfileData[1];
  const userProf = changeProfileData[2];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);
  formData.append("userProf", userProf);
  const resp = await fetch(baseUrl + "/changeProfile", {
    method: "POST",
    body: formData,
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default changeProfile;
