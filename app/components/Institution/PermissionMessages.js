import React from 'react';
import PropTypes from 'prop-types';
import { InsufficientPermissionMsg, DeletePermissionMsg } from './index';

const PermissionMessages = ({ hasPermissions }) => {
  if (!hasPermissions) {
    return <InsufficientPermissionMsg />;
  }

  return <DeletePermissionMsg />;
};

PermissionMessages.propTypes = {
  hasPermissions: PropTypes.bool,
};

export { PermissionMessages };
