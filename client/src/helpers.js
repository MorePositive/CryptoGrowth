export const convertToBillions = (amount) => {
  return `${(amount / 1000000000).toFixed(2)}B`;
};
