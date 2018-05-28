import React from 'react';
import PropTypes from 'prop-types';

const LimitedPermissionView = ({ cluster }) => {
  return (
    <div>
      <div className="pull-right">
        <button className="btn btn-primary" onClick={this.toggleSchoolModal}>
          <i className="fa fa-university" />Add School
        </button>
      </div>
      <div className="alert alert-warning">
        <i className="fa fa-exclamation-triangle fa-lg" aria-hidden="true" />
        Limited permissions. You can add institutions but not modify the boundary.
      </div>
      <h4 className="text-primary"> Cluster Details</h4>
      <div className="border-base" />
      <div className="base-spacing-mid" />
      <div>{cluster.name}</div>
    </div>
  );
};

LimitedPermissionView.propTypes = {
  cluster: PropTypes.object,
};

export { LimitedPermissionView };
