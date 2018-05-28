import { StaffTypes } from '../../Data';

export const getStaffTypes = (primary) => {
  const institutionType = primary ? 'primary' : 'pre';

  return StaffTypes.filter((type) => {
    return type.institution_type === institutionType;
  }).map((type) => {
    return {
      label: type.staff_type,
      value: type.id,
    };
  });
};
