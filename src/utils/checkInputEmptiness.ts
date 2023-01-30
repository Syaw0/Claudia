interface SimpleObject {
  [index: string]: any;
}

const checkInputsEmptiness = (inputs: SimpleObject) => {
  const filtered = Object.keys(inputs).filter((input) => {
    if (typeof inputs[input] == "string") {
      return inputs[input].trim() === "";
    }
  });
  return filtered.length == 0;
};

export default checkInputsEmptiness;
