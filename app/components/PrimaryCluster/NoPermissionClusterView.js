import React from 'react';
import PropTypes from 'prop-types';

const NoPermissionClusterView = ({ cluster }) =>
  <div>
    <div className="alert alert-danger">
      <i className="fa fa-lock fa-lg" aria-hidden="true" />
      Insufficient Privileges. Only administrators can modify boundary details.
    </div>
    <h4 className="text-primary">Cluster</h4>
    <div className="border-base" />
    <div className="base-spacing-mid" />
    <div>
      {cluster.name}
    </div>
  </div>;

NoPermissionClusterView.propTypes = {
  cluster: PropTypes.object,
};

export { NoPermissionClusterView };
