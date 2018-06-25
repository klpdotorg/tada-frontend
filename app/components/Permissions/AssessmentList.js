import React from 'react';
import capitalize from 'lodash.capitalize';
import PropTypes from 'prop-types';

import { Loading } from '../common';

const RenderMessage = ({ assessmentsLength, loading, noSelectedBoundaries }) => {
  if (loading) {
    return <tr />;
  }

  if (noSelectedBoundaries) {
    return (
      <tr>
        <td>Please select Boundaries to see Assessments!</td>
      </tr>
    );
  }

  if (!assessmentsLength) {
    return (
      <tr>
        <td>No Assessments Found!</td>
      </tr>
    );
  }

  return <tr />;
};

const BoundaryAssessmentListView = (props) => {
  const { assessments, loading, selectedAssessments, noSelectedBoundaries } = props;
  return (
    <div className="col-md-4 permission-item-table boundary-assessments">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" className="text-center table-header">
              Assessments in the selected Boundaries
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          ) : (
            assessments.map((assessment) => {
              const checkedAssessments = selectedAssessments.includes(assessment.questiongroup_id);
              return (
                <tr key={assessment.id}>
                  <td>
                    <span>{capitalize(assessment.name || '')}</span>
                    <input
                      type="checkbox"
                      className="select-checkbox"
                      checked={checkedAssessments}
                      onChange={() => {
                        props.selectAssessment(assessment.questiongroup_id);
                      }}
                    />
                  </td>
                </tr>
              );
            })
          )}
          <RenderMessage
            assessmentsLength={assessments.length}
            noSelectedBoundaries={noSelectedBoundaries}
            loading={loading}
          />
        </tbody>
      </table>
    </div>
  );
};

BoundaryAssessmentListView.propTypes = {
  assessments: PropTypes.array,
  loading: PropTypes.bool,
  selectedAssessments: PropTypes.array,
  noSelectedBoundaries: PropTypes.bool,
};

RenderMessage.propTypes = {
  assessmentsLength: PropTypes.number,
  noSelectedBoundaries: PropTypes.bool,
  loading: PropTypes.bool,
};

export { BoundaryAssessmentListView };
