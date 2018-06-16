import React from 'react';
import PropTypes from 'prop-types';

const ProgramDetailsView = (props) => {
  const { program, assessment } = props;

  return (
    <div className="row">
      <div className="col-md-8">
        <h5>
          <span className="text-primary">
            <strong>Survey name: </strong>
          </span>
          {program.name}
        </h5>
        <h5>
          <span className="text-primary">
            <strong>Questiongroup name: </strong>
          </span>
          {assessment.name}
        </h5>
      </div>

      <div className="col-md-4 pull-right">
        <button type="button" className="btn btn-primary" onClick={props.toggleCreateQuestionModal}>
          Add Question
        </button>
        <button className="btn btn-info padded-btn" onClick={props.goBack}>
          Back to Program
        </button>
      </div>
    </div>
  );
};

ProgramDetailsView.propTypes = {
  program: PropTypes.object,
  assessment: PropTypes.object,
  toggleCreateQuestionModal: PropTypes.func,
  goBack: PropTypes.func,
};

export { ProgramDetailsView };
