import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { dateParser } from '../../utils';

const AssessmentRow = (props) => {
  const { assessment } = props;

  return (
    <tr key={assessment.id} id={assessment.id}>
      <td>{assessment.name}</td>
      <td>{dateParser(assessment.start_date)}</td>
      <td>{dateParser(assessment.end_date)}</td>
      <td>{assessment.type}</td>
      <td>{assessment.double_entry}</td>
      <td>{assessment.academic_year}</td>
      <td>
        <input
          type="checkbox"
          // onChange={selectAssessment}
          checked
        />
      </td>
      <td>
        <button
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Edit Assessment"
          // onClick={this.openEditAssessmentModal}
        >
          <span className="fa fa-pencil-square-o" />
        </button>
        <Link
          className="btn btn-primary padded-btn"
          to={assessment.questionsUrl}
          data-toggle="tooltip"
          title="View Questions"
        >
          <i className="fa fa-question" />
        </Link>
      </td>
    </tr>
  );
};

AssessmentRow.propTypes = {
  assessment: PropTypes.object,
};

export { AssessmentRow };
