export const filterRespondentTypes = (respondentTypes) => {
  return respondentTypes.map((type) => {
    return {
      value: type.char_id,
      label: type.name,
    };
  });
};
