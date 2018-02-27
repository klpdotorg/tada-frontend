import React from 'react';
import PropTypes from 'prop-types';

import { Assessment, EditAssessment } from '../../containers/Assessments';
import { Loading, Message } from '../common';

const AssessmentTable = (props) => {
  const { loading, assessments } = props;

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h4 className="text-primary text-center">Assessments in this Programme</h4>
      <hr style={{ width: 100 }} />
      <div className="border-table">
        <table className="table table-striped" style={{ marginBottom: 0 }}>
          <tbody>
            <tr className="info">
              <th>Assessment</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Type</th>
              <th>Double Entry</th>
              <th>Flexi-type</th>
              <th>Actions</th>
            </tr>
            {assessments.map((id) => {
              return <Assessment id={id} key={id} />;
            })}
          </tbody>
        </table>
        {!assessments.length ? (
          <div className="base-spacing">
            <Message message="No Assessments Found!" />
          </div>
        ) : (
          <div />
        )}
      </div>
      <EditAssessment />
    </div>
  );
};

AssessmentTable.propTypes = {
  loading: PropTypes.bool,
  assessments: PropTypes.array,
};

export { AssessmentTable };
