import React from 'react';
import PropTypes from 'prop-types';

const InstitutionActions = ({ canModify, toggleClassModal, showTeachers }) => {
  return (
    <div className="row">
      <h4 className="text-primary col-md-9">{canModify ? 'Modify Details' : 'View Details'}</h4>
      <div className="col-md-3 text-right">
        {!canModify ? null : (
          <button
            className="btn btn-orange"
            title="Add Class"
            onClick={toggleClassModal}
            disabled={!canModify}
          >
            Add Class
          </button>
        )}
        <button
          className="btn btn-orange padded-btn"
          title="View Teachers"
          onClick={showTeachers}
          disabled={!canModify}
        >
          View Teachers
        </button>
      </div>
    </div>
  );
};

InstitutionActions.propTypes = {
  canModify: PropTypes.bool,
  toggleClassModal: PropTypes.func,
  showTeachers: PropTypes.func,
};

export { InstitutionActions };
