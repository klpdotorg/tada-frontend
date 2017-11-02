import React from 'react';
import PropTypes from 'prop-types';

const PermissionView = ({ institution }) => (
  <div>
    <div>
      <div className="alert alert-danger">
        <i className="fa fa-lock fa-lg" aria-hidden="true" />
        Insufficient Privileges. Please contact administrator for permissions to modify the
        institution.
      </div>
    </div>
    <h4 className="text-primary">Institution Details</h4>
    <div className="border-base" />
    <div className="base-spacing-mid" />
    <div>
      {institution.name}
    </div>
  </div>
);

PermissionView.propTypes = {
  institution: PropTypes.object,
};

export { PermissionView };
