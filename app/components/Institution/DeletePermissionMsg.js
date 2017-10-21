import React from 'react';

const DeletePermissionMsg = () =>
  <div className="alert alert-info">
    <i className="fa fa-info-circle fa-lg" aria-hidden="true" /> You cannot delete this institution
    until its classes are deleted
  </div>;

export { DeletePermissionMsg };
