import baseUrl from "./baseUrl";

const makeCopy = async (copyData: [x: string, y: string]) => {
  const cwd = copyData[0];
  const name = copyData[1];
  const resp = await fetch(baseUrl + "/makeCopy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cwd, name }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default makeCopy;
