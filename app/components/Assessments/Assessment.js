import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { DeactivateEntity } from '../../containers/Modal';
import { dateParser } from '../../utils';

const AssessmentRow = (props) => {
  const { assessment, url } = props;
  return (
    <tr key={assessment.id}>
      <td>{assessment.name}</td>
      <td>{dateParser(assessment.start_date)}</td>
      <td>{dateParser(assessment.end_date)}</td>
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
        <Link
          className="btn btn-primary padded-btn"
          to={url}
          data-toggle="tooltip"
          title="View Questions"
        >
          <i className="fa fa-question" />
        </Link>
        <button
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Edit Question"
          onClick={() => {
            props.showDeactivateModal(assessment.name, assessment.id);
          }}
        >
          <span className="fa fa-ban" />
        </button>
      </td>
      <DeactivateEntity
        uniqueId={assessment.id}
        onYes={() => {
          props.deactivateAssessment(assessment.id);
        }}
      />
    </tr>
  );
};

AssessmentRow.propTypes = {
  assessment: PropTypes.object,
  url: PropTypes.string,
  openEditAssessmentModal: PropTypes.func,
  showDeactivateModal: PropTypes.func,
  deactivateAssessment: PropTypes.func,
};

export { AssessmentRow };
