// function random number with floating points from two integers numbers

const getFloatingPointNumber = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return Number(result.toFixed(digits));
};

export {getFloatingPointNumber};
