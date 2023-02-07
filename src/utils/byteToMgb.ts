const byteToMgb = (byte: number) => {
  return (byte * 10 ** -6).toFixed(2);
};
export default byteToMgb;
