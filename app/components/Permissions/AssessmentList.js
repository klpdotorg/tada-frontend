import React from 'react';
import capitalize from 'lodash.capitalize';
import PropTypes from 'prop-types';

import { Loading } from '../common';

const BoundaryAssessmentListView = (props) => {
  const { assessments, loading, selectedAssessments } = props;
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
              const checkedAssessments = selectedAssessments.includes(assessment.id);
              return (
                <tr>
                  <td>
                    <span>{capitalize(assessment.name || '')}</span>
                    <input
                      type="checkbox"
                      className="select-checkbox"
                      checked={checkedAssessments}
                      onChange={() => {
                        props.selectAssessment(assessment.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })
          )}
          {!loading && !assessments.length ? (
            <tr>
              <td>No Assessments Found</td>
            </tr>
          ) : (
            <tr />
          )}
        </tbody>
      </table>
    </div>
  );
};

BoundaryAssessmentListView.propTypes = {
  assessments: PropTypes.array,
  loading: PropTypes.bool,
  selectedAssessments: PropTypes.array,
};

export { BoundaryAssessmentListView };
