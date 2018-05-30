import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import { dateParser } from '../../utils';

const AssessmentRow = (props) => {
  const { assessment, url, selectedAssessments } = props;
  const checked = selectedAssessments.includes(assessment.id);

  return (
    <tr key={assessment.id}>
      <td>
        <input
          checked={checked}
          onChange={() => {
            props.selectAssessment(assessment.id);
          }}
          type="checkbox"
        />
      </td>
      <td>{assessment.name}</td>
      <td>{dateParser(get(assessment, 'start_date', new Date()))}</td>
      <td>{dateParser(get(assessment, 'end_date', new Date()))}</td>
      <td>{assessment.type}</td>
      <td>{assessment.double_entry}</td>
      <td>{assessment.academic_year}</td>
      <td>
        <button
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Edit Assessment"
          onClick={() => {
            props.openEditAssessmentModal(assessment.id);
          }}
        >
          <span className="fa fa-pencil-square-o" />
        </button>
      </td>
      <td>
        <button
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="View Questions"
          onClick={() => {
            props.redirect(url);
          }}
        >
          <i className="fa fa-question" />
        </button>
      </td>
    </tr>
  );
};

AssessmentRow.propTypes = {
  assessment: PropTypes.object,
  url: PropTypes.string,
  openEditAssessmentModal: PropTypes.func,
  selectAssessment: PropTypes.func,
  selectedAssessments: PropTypes.array,
  redirect: PropTypes.func,
};

export { AssessmentRow };
