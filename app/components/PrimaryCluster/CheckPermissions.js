import React from 'react';
import PropTypes from 'prop-types';

import { EditCluster } from '../../containers/PrimaryCluster';

import { LimitedPermissionsView, NoPermissionClusterView } from './index';

const CheckPermissions = ({ canModify }) => {
  if (sessionStorage.getItem('isAdmin')) {
    return <EditCluster />;
  }

  if (canModify) {
    return <LimitedPermissionsView />;
  }

  return <NoPermissionClusterView />;
};

CheckPermissions.propTypes = {
  canModify: PropTypes.bool,
};

export { CheckPermissions };
