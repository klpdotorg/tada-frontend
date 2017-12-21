import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editQuestion } from '../../actions';

const QuestionView = (props) => {
  const { question_text, display_text, key, question_type } = props.question;

  return (
    <tr>
      <td>{question_text}</td>
      <td>{display_text}</td>
      <td>{question_type}</td>
      <td>{key}</td>
      <td>
        <button
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Edit Question"
          onClick={() => {
            // props.openEditAssessmentModal(assessment.id);
          }}
        >
          <span className="fa fa-pencil-square-o" />
        </button>
      </td>
    </tr>
  );
};

QuestionView.propTypes = {
  question: PropTypes.object,
};

const Question = connect(null, { editQuestion })(QuestionView);

export { Question };
