import React from 'react';
import PropTypes from 'prop-types';

const InstitutionActions = ({ hasPermissions, toggleClassModal, showTeachers }) => {
  return (
    <div className="row">
      <h4 className="text-primary col-md-9">
        {!hasPermissions ? 'Modify Details' : 'View Details'}
      </h4>
      <div className="col-md-3 text-right">
        <button
          className="btn btn-orange"
          title="Add Class"
          onClick={toggleClassModal}
          disabled={!hasPermissions}
        >
          Add Class
        </button>
        <button className="btn btn-orange padded-btn" title="View Teachers" onClick={showTeachers}>
          View Teachers
        </button>
      </div>
    </div>
  );
};

InstitutionActions.propTypes = {
  hasPermissions: PropTypes.bool,
  toggleClassModal: PropTypes.func,
  showTeachers: PropTypes.func,
};

export { InstitutionActions };
