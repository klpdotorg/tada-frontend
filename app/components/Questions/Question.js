import React from 'react';

const Question = (props) => {
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

export { Question };
