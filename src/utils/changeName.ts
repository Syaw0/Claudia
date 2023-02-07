import baseUrl from "./baseUrl";

const changeName = async (changeNameData: [x: string, y: string]) => {
  const newName = changeNameData[0];
  const userId = changeNameData[1];
  const resp = await fetch(baseUrl + "/changeName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, newName }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default changeName;
