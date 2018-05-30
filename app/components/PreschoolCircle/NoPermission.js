import React from 'react';
import PropTypes from 'prop-types';

const NoPermissionView = ({ circle }) => {
  return (
    <div>
      <div className="alert alert-danger">
        <i className="fa fa-lock fa-lg" aria-hidden="true" />
        Insufficient Privileges. Only administrators can modify boundary details.
      </div>
      <h4 className="text-primary">Circle</h4>
      <div className="border-base" />
      <div className="base-spacing-mid" />
      <div>{circle.name}</div>
    </div>
  );
};

NoPermissionView.propTypes = {
  circle: PropTypes.object,
};

export { NoPermissionView };
