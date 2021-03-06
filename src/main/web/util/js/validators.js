export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = min => value =>
  !value || value.length < min ? `Must be ${min} characters or more` : undefined;

export const passwordLengthWarn = (minimalLength, correctLength) => value =>
  value && value.length >= minimalLength && value.length < correctLength
    ? 'Consider using longer password' : undefined;

export const required = value => value ? undefined : 'Required';

export const isInteger = value => !isNaN(value)
                                  && parseInt(Number(value)) == value
                                  && !isNaN(parseInt(value, 10));

export const isIntegerValidator = value => isInteger(value)
  ? undefined : 'Not a valid number';

export const isDouble = value => !isNaN(value) && Number(value) == value;

export const isDoubleValidator = value => isDouble(value)
  ? undefined : 'Not a valid number';

export const lessThen = max => value =>
  value >= max ? `Must be less then ${max}` : undefined;

export const validateFieldMatch = (firstFieldName, secondFieldName, message) => values => {
  const errors = {};
  if (values[firstFieldName] !== values[secondFieldName]) {
    errors[secondFieldName] = message;
  }
  return errors;
};

export const email = email => {
  return isCorrectEmail(email) ? undefined : 'Not valid email';
};

export const isCorrectEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const mapErrorCodeToMessage = (code, defaultMessage) => {
  switch (code) {
    case 'Size':
      return defaultMessage;
    case 'Email':
      return 'Not valid email';
    case 'EmailUnique':
      return 'Email is taken';
    case 'NotBlank':
      return 'Required';
  }
};