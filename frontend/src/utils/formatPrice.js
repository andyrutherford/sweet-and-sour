export default (number) => {
  return Number(Math.round(number * 100) / 100).toFixed(2);
};
