import baseUrl from "./baseUrl";

const updateFileList = async (updateData: [x: string]) => {
  const cwd = updateData[0];
  const resp = await fetch(baseUrl + `/updateFileList?cwd=${cwd}`);
  const data = await resp.json();
  return data;
};

export const loaderMsg = "please wait to update list";
export default updateFileList;
