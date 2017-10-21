import React from 'react';
import PropTypes from 'prop-types';
import { InsufficientPermissionMsg, DeletePermissionMsg } from './index';

const PermissionMessages = ({ canModify }) => {
  if (canModify) {
    return <InsufficientPermissionMsg />;
  }

  return <DeletePermissionMsg />;
};

PermissionMessages.propTypes = {
  canModify: PropTypes.bool,
};

export { PermissionMessages };
