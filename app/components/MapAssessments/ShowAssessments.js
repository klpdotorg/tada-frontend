import React from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';

const ShowAssessmentsView = (props) => {
  const { assessments, selectedAssessments } = props;

  return (
    <div className="row center-block">
      <div className="col-md-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Assessments</h3>
          </div>
          {/* TODO ADD LOADING */}
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
                      onChange={(e) => {
                        props.selectAssessment(assessment.id, e.target.checked);
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

ShowAssessmentsView.propTypes = {
  assessments: PropTypes.array,
  selectedAssessments: PropTypes.array,
  selectAssessment: PropTypes.func,
};

export { ShowAssessmentsView };
