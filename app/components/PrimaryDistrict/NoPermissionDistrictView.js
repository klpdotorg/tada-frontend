import React from 'react';
import PropTypes from 'prop-types';

const NoPermissionDistrictView = ({ name }) =>
  <div>
    <div className="alert alert-danger">
      <i className="fa fa-lock fa-lg" aria-hidden="true" />
      Insufficient Privileges. Only administrators can modify boundary details.
    </div>
    <h4 className="text-primary">District</h4>
    <div className="border-base" />
    <div className="base-spacing-mid" />
    <div>
      {name}
    </div>
  </div>;

NoPermissionDistrictView.propTypes = {
  name: PropTypes.string,
};

export { NoPermissionDistrictView };
