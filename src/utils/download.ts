import baseUrl from "./baseUrl";

const download = async (downloadData: [x: string, y: string]) => {
  const cwd = downloadData[1];
  const fileName = downloadData[0];
  // const resp = await fetch(
  //   baseUrl + `/download?cwd=${cwd}&fileName=${fileName}`
  // );
  // TODO fix this:!!
  window.open(baseUrl + `/download?cwd=${cwd}&fileName=${fileName}`);

  return { status: true, msg: "download start..." };
};

export const loaderMsg = "please wait until server response.";
export default download;
