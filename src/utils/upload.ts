import baseUrl from "./baseUrl";

const upload = async (fileData: [x: FileList, y: string]) => {
  const files = fileData[0];
  const cwd = fileData[1];
  const formData = new FormData();
  for (let i = 0; i != files.length; i++) {
    formData.append(`${i}`, files[i]);
  }

  formData.append("cwd", cwd);

  const resp = await fetch(baseUrl + "/upload", {
    method: "POST",
    body: formData,
  });
  const data = await resp.json();
  return data;
};

export const loaderMsg = "wait until upload complete";
export default upload;
