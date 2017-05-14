import {isInteger} from "./validators";

export const integerNormalizer = (value, previousValue) =>
  isInteger(value) ? Number(value) : previousValue;