import React from 'react';
import PropTypes from 'prop-types';

const QuestionView = (props) => {
  const { question_text, display_text, key, question_type, id } = props.question;

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
            props.editQuestion(id);
          }}
        >
          <span className="fa fa-pencil-square-o" />
        </button>
      </td>
      <td>
        <button
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Delete Question"
          onClick={() => {
            props.deleteQuestion(props.assessmentId, id);
          }}
        >
          <span className="fa fa-trash" />
        </button>
      </td>
    </tr>
  );
};

QuestionView.propTypes = {
  question: PropTypes.object,
  editQuestion: PropTypes.func,
  deleteQuestion: PropTypes.func,
  assessmentId: PropTypes.any,
};

export { QuestionView };
