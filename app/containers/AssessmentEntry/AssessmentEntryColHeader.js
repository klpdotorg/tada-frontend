import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import orderBy from 'lodash.orderby';

const getHeaderName = (boundaryType) => {
  if (boundaryType === 'institution') {
    return 'Institution Name';
  }

  if (boundaryType === 'studentgroup') {
    return 'Studentgroup Name';
  }

  return 'Student Name';
};

const AssessmentEntryColHeaderView = (props) => {
  const { questions, commentRequired, boundaryType, groupText, respondentTypeRequired } = props;

  return (
    <tr className="bg-info">
      <td className="id-field">ID</td>
      <td colSpan="2" className="text-field">
        {getHeaderName(boundaryType)}
      </td>
      {groupText ? (
        <td className="input-field">{groupText}</td>
      ) : (
        <td style={{ display: 'none' }} />
      )}
      <td className="date-field">Date of Visit</td>
      {respondentTypeRequired ? (
        <td className="multi-select">Respondent Type</td>
      ) : (
        <td style={{ display: 'none' }} />
      )}
      {commentRequired ? (
        <td className="input-field">Comments</td>
      ) : (
        <td style={{ display: 'none' }} />
      )}
      {questions.map((question) => {
        const { question_text, display_text, id, question_type } = question.question_details;
        if (question_type === 'CheckBox' || question_type === 'Radio' || question_type === 'Date') {
          return (
            <td key={id} title={question_text} className="multi-select">
              {display_text}
            </td>
          );
        }
        return (
          <td key={id} title={question_text} className="input-field">
            {display_text}
          </td>
        );
      })}
      <td className="input-field">Save</td>
    </tr>
  );
};

AssessmentEntryColHeaderView.propTypes = {
  questions: PropTypes.array,
  commentRequired: PropTypes.bool,
  boundaryType: PropTypes.string,
  groupText: PropTypes.string,
  respondentTypeRequired: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});
  const questionValues = Object.values(state.questions.questions);
  const questions = orderBy(questionValues, ['sequence'], ['asc']);
  return {
    questions,
    commentRequired: get(assessment, 'comments_required'),
    groupText: get(assessment, 'group_text'),
    respondentTypeRequired: get(assessment, 'respondenttype_required'),
  };
};

const AssessmentEntryColHeader = connect(mapStateToProps)(AssessmentEntryColHeaderView);

export { AssessmentEntryColHeader };
