import baseUrl from "./baseUrl";

const createDirectory = async (createData: [x: string, y: string]) => {
  const name = createData[0];
  const cwd = createData[1];

  const resp = await fetch(baseUrl + "/mkdir", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, cwd }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default createDirectory;
