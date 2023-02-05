const random = (min: number, max: number): number => {
  const randomNumber = min + Math.floor(Math.random() * (max - min));
  return randomNumber;
};

export default random;
