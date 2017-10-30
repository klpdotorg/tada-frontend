import React from 'react';
import PropTypes from 'prop-types';

const NoPermissionView = ({ project }) => (
  <div>
    <div className="alert alert-danger">
      <i className="fa fa-lock fa-lg" aria-hidden="true" />
      Insufficient Privileges. Only administrators can modify boundary details.
    </div>
    <h4 className="text-primary">Project</h4>
    <div className="border-base" />
    <div className="base-spacing-mid" />
    <div>{project.name}</div>
  </div>
);

NoPermissionView.propTypes = {
  project: PropTypes.object,
};

export { NoPermissionView };
