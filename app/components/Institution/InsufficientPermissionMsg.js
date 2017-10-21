import React from 'react';

const InsufficientPermissionMsg = () =>
  <div>
    <div className="alert alert-danger">
      <i className="fa fa-lock fa-lg" aria-hidden="true" />
      Insufficient Privileges. Please contact administrator for permissions to modify the
      institution.
    </div>
  </div>;
export { InsufficientPermissionMsg };
