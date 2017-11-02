import React from 'react';
import PropTypes from 'prop-types';

const PreschoolActions = ({ toggleClassModal, showTeachers }) => (
  <div className="col-md-3 text-right">
    <button className="btn btn-green" title="Add Class" onClick={toggleClassModal}>
      Add Class
    </button>
    <button
      className="btn btn-green padded-btn"
      title="View Teachers"
      onClick={showTeachers}
    >
      View Teachers
    </button>
  </div>
);

PreschoolActions.propTypes = {
  toggleClassModal: PropTypes.func,
  showTeachers: PropTypes.func,
};

export { PreschoolActions };
