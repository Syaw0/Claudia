import baseUrl from "./baseUrl";

const rename = async (renameData: [x: string, y: string, z: string]) => {
  const cwd = renameData[0];
  const fileName = renameData[1];
  const newName = renameData[2];
  const resp = await fetch(baseUrl + "/rename", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cwd, fileName, newName }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default rename;
