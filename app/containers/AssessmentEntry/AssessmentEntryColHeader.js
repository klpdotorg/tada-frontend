import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';

const AssessmentEntryColHeaderView = ({ questions, commentRequired }) => {
  const values = Object.keys(questions);

  return (
    <tr className="bg-info">
      <td>ID</td>
      <td colSpan="2">Boundary Name</td>
      <td>Name</td>
      <td>Date of Visit</td>
      {commentRequired ? <td>Comments</td> : <td style={{ display: 'none' }} />}
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
  commentRequired: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});
  return {
    questions: state.questions.questions,
    commentRequired: get(assessment, 'comments_required'),
  };
};

const AssessmentEntryColHeader = connect(mapStateToProps)(AssessmentEntryColHeaderView);

export { AssessmentEntryColHeader };
