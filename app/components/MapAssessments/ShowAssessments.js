import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash.includes';

import { Loading, Message } from '../common';

const AssessmentList = (props) => {
  const { loading, assessments, selectedAssessments } = props;

  if (loading) {
    return (
      <div className="loading-cont">
        <Loading />
      </div>
    );
  }

  if (!assessments.length) {
    return <Message message="No Assessments Found" style={{ padding: 10 }} />;
  }

  return (
    <ul className="list-group" style={{ maxHeight: 200, overflowY: 'auto' }}>
      {assessments.map((assessment) => {
        const checked = includes(selectedAssessments, assessment.id);

        return (
          <li className="list-group-item" key={assessment.id}>
            {assessment.name}
            <div className="pull-right">
              <input
                type="checkbox"
                aria-label="..."
                checked={checked}
                onChange={() => {
                  props.selectAssessment(assessment.id);
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const ShowAssessmentsView = (props) => {
  return (
    <div className="row center-block">
      <div className="col-md-12" style={{ marginTop: 10 }}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Assessments</h3>
          </div>
          <AssessmentList {...props} />
        </div>
      </div>
    </div>
  );
};

AssessmentList.propTypes = {
  assessments: PropTypes.array,
  selectedAssessments: PropTypes.array,
  loading: PropTypes.bool,
};

export default ShowAssessmentsView;
