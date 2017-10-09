import React from 'react';
import PropTypes from 'prop-types';

const NoPermissionBlockView = ({ name }) =>
  <div>
    <div className="alert alert-danger">
      <i className="fa fa-lock fa-lg" aria-hidden="true" />
      Insufficient Privileges. Only administrators can modify boundary details.
    </div>
    <h4 className="text-primary">Block</h4>
    <div className="border-base" />
    <div className="base-spacing-mid" />
    <div>
      {name}
    </div>
  </div>;

NoPermissionBlockView.propTypes = {
  name: PropTypes.string,
};

export { NoPermissionBlockView };
