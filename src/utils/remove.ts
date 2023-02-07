import baseUrl from "./baseUrl";

const remove = async (removeData: [x: string, y: string]) => {
  const cwd = removeData[0];
  const filename = removeData[1];

  const resp = await fetch(baseUrl + "/rm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cwd, filename }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default remove;
