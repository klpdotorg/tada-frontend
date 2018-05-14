import React from 'react';
import PropTypes from 'prop-types';

const PermissionView = ({ hasPermissions }) => {
  if (hasPermissions) {
    return <span />;
  }

  return (
    <div className="alert alert-danger">
      <i className="fa fa-lock fa-lg" aria-hidden="true" />
      Insufficient Privileges. Please contact administrator for permissions to modify the
      institution.
    </div>
  );
};

PermissionView.propTypes = {
  hasPermissions: PropTypes.bool,
};

export { PermissionView };
