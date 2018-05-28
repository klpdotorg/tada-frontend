import React from 'react';
import PropTypes from 'prop-types';

const ShowAssessmentTypesView = (props) => {
  const { assessmentTypes, value } = props;

  return (
    <div className="row center-block">
      <div className="col-md-12" style={{ marginTop: 10 }}>
        <p className="text-default" htmlFor="selectAssessmentType">
          Select Assessment Type{' '}
        </p>
        <select
          className="form-control"
          id="selectAssessmentType"
          onChange={(e) => {
            props.changeAssessmentType(e.target.value);
          }}
          value={value}
        >
          {assessmentTypes.map((type) => {
            return (
              <option key={type.value} value={type.id}>
                {type.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

ShowAssessmentTypesView.propTypes = {
  assessmentTypes: PropTypes.array,
  value: PropTypes.number,
  changeAssessmentType: PropTypes.func,
};

export { ShowAssessmentTypesView };
