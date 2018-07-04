import isEmpty from 'lodash.isempty';

const requiredFields = ['first_name', 'dob', 'gender'];
const requiredLength = { uid: 9 };

export const checkForRequiredFields = (fields) => {
  let disabled = false;
  if (!fields || isEmpty(fields)) {
    return true;
  }

  const keys = Object.keys(fields);
  keys.forEach((field) => {
    if (requiredFields.includes(field)) {
      if (!fields[field]) {
        disabled = true;
      }
    }
  });

  return disabled;
};

export const checkRequiredLengthFields = (fields) => {
  let disabled = false;
  if (!fields || isEmpty(fields)) {
    return true;
  }

  const keys = Object.keys(fields);
  const requiredLengthFields = Object.keys(requiredLength);

  keys.forEach((field) => {
    if (requiredLengthFields.includes(field)) {
      if (fields[field] && fields[field].length !== requiredLength[field]) {
        disabled = true;
      }
    }
  });

  return disabled;
};
