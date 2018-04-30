import React from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import { Loading } from '../common';

const ShowAssessmentsView = (props) => {
  const { assessments, selectedAssessments, loading } = props;

  return (
    <div className="row center-block">
      <div className="col-md-12" style={{ marginTop: 10 }}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Assessments</h3>
          </div>
          {loading ? (
            <div className="loading-cont">
              <Loading />
            </div>
          ) : (
            <div />
          )}
          {!loading ? (
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
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

ShowAssessmentsView.propTypes = {
  assessments: PropTypes.array,
  selectedAssessments: PropTypes.array,
  selectAssessment: PropTypes.func,
  loading: PropTypes.bool,
};

export { ShowAssessmentsView };
