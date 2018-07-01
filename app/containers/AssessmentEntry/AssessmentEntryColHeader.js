import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AssessmentEntryColHeaderView = ({ questions }) => {
  const values = Object.keys(questions);
  return (
    <tr className="bg-info">
      <td>ID</td>
      <td colSpan="2">Boundary Name</td>
      <td>Name</td>
      <td>Date of Visit</td>
      {values.map((id, i) => {
        return (
          <td key={id} title={questions[id].question_text}>
            {i + 1}
          </td>
        );
      })}
      <td>Save</td>
    </tr>
  );
};

AssessmentEntryColHeaderView.propTypes = {
  questions: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
  };
};

const AssessmentEntryColHeader = connect(mapStateToProps)(AssessmentEntryColHeaderView);

export { AssessmentEntryColHeader };
