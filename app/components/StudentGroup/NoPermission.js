import React from 'react';
import PropTypes from 'prop-types';

const NoPermissionView = ({ group }) => (
  <div>
    <div className="alert alert-danger">
      <i className="fa fa-lock fa-lg" aria-hidden="true" />
      Insufficient Privileges. Only administrators can modify boundary details.
    </div>
    <h4 className="text-primary">Project</h4>
    <div className="border-base" />
    <div className="base-spacing-mid" />
    <div>{group.name}</div>
  </div>
);

NoPermissionView.propTypes = {
  group: PropTypes.object,
};

export { NoPermissionView };
