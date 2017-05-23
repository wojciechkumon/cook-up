import {isDouble, isInteger} from "./validators";

export const integerNormalizer = (value, previousValue) => {
  if (value === "") {
    return value;
  }
  return isInteger(value) ? parseInt(Number(value)) : previousValue;
};

export const doubleNormalizer = (value, previousValue) => {
  if (value === "") {
    return value;
  }
  if (!isDouble(value)) {
    return previousValue;
  } else {
    return Number(Number(value).toFixed(2));
  }
};