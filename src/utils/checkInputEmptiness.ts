interface SimpleObject {
  [index: string]: string;
}

const checkInputsEmptiness = (inputs: SimpleObject) => {
  const filtered = Object.keys(inputs).filter((input) => {
    return inputs[input].trim() === "";
  });
  return filtered.length == 0;
};

export default checkInputsEmptiness;
