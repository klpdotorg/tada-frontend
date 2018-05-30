import React from 'react';
import PropTypes from 'prop-types';

import { Assessment, EditAssessment } from '../../containers/Assessments';
import { Confirm } from '../../containers/Modal';
import { Loading, Message } from '../common';

const AssessmentTable = (props) => {
  const { loading, assessments, canEdit } = props;

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
              <th>Select</th>
              <th>Assessment</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Type</th>
              <th>Double Entry</th>
              <th>Flexi-type</th>
              <th>Edit</th>
              <th>Questions</th>
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
      <div className="assessments-actions">
        <button
          type="button"
          className="btn btn-primary margin-right-btn"
          disabled={canEdit}
          onClick={() => {
            props.openDeleteAssessmentsModal('deleteAssessmnets');
          }}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={canEdit}
          onClick={() => {
            props.openDeactivateAssessmentsModal('deactivateAssessments');
          }}
        >
          Deactivate
        </button>
        <Confirm uniqueId="deactivateAssessments" onYes={props.deactivateAssessments} />
        <Confirm uniqueId="deleteAssessmnets" onYes={props.deleteAssessments} />
      </div>
    </div>
  );
};

AssessmentTable.propTypes = {
  canEdit: PropTypes.bool,
  loading: PropTypes.bool,
  assessments: PropTypes.array,
  openDeactivateAssessmentsModal: PropTypes.func,
  deactivateAssessments: PropTypes.func,
  openDeleteAssessmentsModal: PropTypes.func,
  deleteAssessments: PropTypes.func,
};

export { AssessmentTable };
