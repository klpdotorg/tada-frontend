import get from 'lodash.get';

const permissions = {
  tada_dee: [
    'mapAssessments',
    'programs',
    'createProgram',
    'createAssessments',
    'createQuestion',
    'editQuestion',
  ],
  tada_deo: [],
};

export const checkPermissions = (groups, operation) => {
  let hasPermission = false;
  groups.forEach((group) => {
    const permission = get(permissions, group.name, []);
    if (permission.includes(operation)) {
      hasPermission = true;
    }
  });

  return hasPermission;
};
