import React from 'react';
import PropTypes from 'prop-types';

import { EditCluster } from '../../containers/PrimaryCluster';

const CheckPermissions = ({ clusterNodeId, blockNodeId, blockId }) => {
  return <EditCluster clusterNodeId={clusterNodeId} blockNodeId={blockNodeId} blockId={blockId} />;
};

CheckPermissions.propTypes = {
  clusterNodeId: PropTypes.string,
  blockId: PropTypes.number,
  blockNodeId: PropTypes.string,
};

export { CheckPermissions };
