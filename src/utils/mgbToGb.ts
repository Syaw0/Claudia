const mgbToGb = (mgb: number) => {
  return `${(mgb / 1000).toFixed(1)} GB`;
};

export default mgbToGb;
