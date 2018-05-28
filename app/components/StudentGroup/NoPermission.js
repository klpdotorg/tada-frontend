import React from 'react';
import PropTypes from 'prop-types';

const NoPermissionView = ({ hasPermissions }) => {
  if (!hasPermissions) {
    return (
      <div className="alert alert-danger">
        <i className="fa fa-lock fa-lg" aria-hidden="true" /> Insufficient Privileges. Please
        contact the administrator.
      </div>
    );
  }

  return <div />;
};

NoPermissionView.propTypes = {
  hasPermissions: PropTypes.bool,
};

export { NoPermissionView };
