import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const ProgramDetailsView = (props) => {
  const { program, assessment } = props;

  return (
    <div className="row">
      <div className="col-md-8">
        <h5>
          <span className="text-primary">
            <strong>Program name: </strong>
          </span>
          {program.name}
        </h5>
        <h5>
          <span className="text-primary">
            <strong>Assessment name: </strong>
          </span>
          {assessment.name}
        </h5>
      </div>

      <div className="col-md-4 pull-right">
        <button type="button" className="btn btn-primary" onClick={props.openCreateQuestionModal}>
          Add Question
        </button>
        <Link to="/programs" className="btn btn-info padded-btn">
          Back to Program
        </Link>
      </div>
    </div>
  );
};

ProgramDetailsView.propTypes = {
  program: PropTypes.object,
  assessment: PropTypes.object,
  openCreateQuestionModal: PropTypes.func,
};

export { ProgramDetailsView };
