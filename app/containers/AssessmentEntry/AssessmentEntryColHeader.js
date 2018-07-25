import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';

const getHeaderName = (boundaryType) => {
  if (boundaryType === 'institution') {
    return 'Institution Name';
  }

  if (boundaryType === 'studentgroup') {
    return 'Studentgroup Name';
  }

  return 'Student Name';
};

const AssessmentEntryColHeaderView = ({ questions, commentRequired, boundaryType, groupText }) => {
  const values = Object.keys(questions);
  return (
    <tr className="bg-info">
      <td>ID</td>
      <td colSpan="2">{getHeaderName(boundaryType)}</td>
      {groupText ? <td>{groupText}</td> : <td style={{ display: 'none' }} />}
      <td>Date of Visit</td>
      {commentRequired ? <td>Comments</td> : <td style={{ display: 'none' }} />}
      {values.map((id) => {
        return (
          <td key={id} title={questions[id].question_text}>
            {questions[id].display_text}
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
  boundaryType: PropTypes.string,
  groupText: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});
  return {
    questions: state.questions.questions,
    commentRequired: get(assessment, 'comments_required'),
    groupText: get(assessment, 'group_text'),
  };
};

const AssessmentEntryColHeader = connect(mapStateToProps)(AssessmentEntryColHeaderView);

export { AssessmentEntryColHeader };
