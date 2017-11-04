import React from 'react';
import PropTypes from 'prop-types';

const NoPermissionView = ({ canModify }) => {
  if (!canModify) {
    return <div />;
  }

  return (
    <div className="alert alert-danger">
      <i className="fa fa-lock fa-lg" aria-hidden="true" /> Insufficient Privileges.
      Please contact the administrator.
    </div>
  );
};

NoPermissionView.propTypes = {
  canModify: PropTypes.bool,
};

export { NoPermissionView };
