import React from 'react';
import PropTypes from 'prop-types';

import { EditCluster } from '../../containers/PrimaryCluster';

import { LimitedPermissionsView, NoPermissionClusterView } from './index';

const CheckPermissions = ({ isAdmin, canModify, clusterNodeId, blockNodeId, blockId }) => {
  if (isAdmin) {
    return (
      <EditCluster clusterNodeId={clusterNodeId} blockNodeId={blockNodeId} blockId={blockId} />
    );
  }

  if (canModify) {
    return <LimitedPermissionsView />;
  }

  return <NoPermissionClusterView />;
};

CheckPermissions.propTypes = {
  isAdmin: PropTypes.bool,
  canModify: PropTypes.bool,
  clusterNodeId: PropTypes.string,
  blockId: PropTypes.number,
  blockNodeId: PropTypes.string,
};

export { CheckPermissions };
