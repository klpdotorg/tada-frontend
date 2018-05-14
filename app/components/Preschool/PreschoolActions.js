import React from 'react';
import PropTypes from 'prop-types';

const PreschoolActions = ({ toggleClassModal, showTeachers, hasPermissions }) => {
  return (
    <div className="row">
      <h4 className="text-primary col-md-9">
        {!hasPermissions ? 'Modify Details' : 'View Details'}
      </h4>
      <div className="col-md-3 text-right">
        <button
          className="btn btn-green"
          title="Add Class"
          onClick={toggleClassModal}
          disabled={hasPermissions}
        >
          Add Class
        </button>
        <button className="btn btn-green padded-btn" title="View Teachers" onClick={showTeachers}>
          View Teachers
        </button>
      </div>
    </div>
  );
};

PreschoolActions.propTypes = {
  toggleClassModal: PropTypes.func,
  showTeachers: PropTypes.func,
  hasPermissions: PropTypes.bool,
};

export { PreschoolActions };
