import get from 'lodash.get';

const permissions = {
  tada_dee: ['permissions', 'users'],
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
