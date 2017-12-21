import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AssessmentEntryColHeaderView = ({ questions }) => {
  return (
    <tr className="bg-info">
      <td>UID</td>
      <td colSpan="2">Name</td>
      {questions.map((question, i) => {
        return <td key={question.id}>{i + 1}</td>;
      })}
      <td>Edit</td>
      <td>Save</td>
    </tr>
  );
};

AssessmentEntryColHeaderView.propTypes = {
  questions: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
  };
};

const AssessmentEntryColHeader = connect(mapStateToProps)(AssessmentEntryColHeaderView);

export { AssessmentEntryColHeader };
