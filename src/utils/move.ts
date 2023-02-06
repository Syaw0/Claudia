import baseUrl from "./baseUrl";

const move = async (moveData: [x: string, y: string, z: string]) => {
  const cwd = moveData[0];
  const init = moveData[1];
  const dest = moveData[2];

  const resp = await fetch(baseUrl + "/move", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cwd, init, dest }),
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait until server response.";
export default move;
