import React from 'react';
import PropTypes from 'prop-types';

const ActionsView = (props) => {
  const { disabledBoundary, disabledAssessment } = props;

  return (
    <div className="permission-actions">
      <button
        type="button"
        className="btn btn-primary"
        onClick={props.submitBoundary}
        disabled={disabledBoundary}
      >
        Assign Permissions to Boundaries
      </button>
      <button
        type="button"
        className="btn btn-primary assessment-button"
        onClick={props.submitAssessment}
        disabled={disabledAssessment}
      >
        Assign Permissions to Assessments
      </button>
    </div>
  );
};

ActionsView.propTypes = {
  disabledBoundary: PropTypes.bool,
  disabledAssessment: PropTypes.bool,
  submitBoundary: PropTypes.func,
  submitAssessment: PropTypes.func,
};

export { ActionsView };
