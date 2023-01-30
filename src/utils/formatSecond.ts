const formatSecond = (time: number) => {
  let minute = Math.trunc(time / 60);
  let second = time - minute * 60;
  return `${minute}:${second}`;
};

export default formatSecond;
