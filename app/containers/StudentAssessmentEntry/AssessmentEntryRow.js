import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import orderBy from 'lodash.orderby';

import { AssessmentEntryRowView } from '../../components/StudentAssessmentEntry';
import { filterRespondentTypes } from '../AssessmentEntry/utils';
import {
  onChangeAnswer,
  editAnswerGroup,
  onChangeDateOfVisit,
  onChangeGroupValue,
  infoNotification,
  onChangeComments,
  onChangeRespondentType,
} from '../../actions';
import { checkAnswergroupPermission } from '../../utils';

class SetDefaultValues extends Component {
  componentDidMount() {
    const { rowId, row } = this.props;
    this.props.onChangeGroupValue(rowId, row.group_value);
    this.props.onChangeDateOfVisit(rowId, new Date(row.date_of_visit));
    this.props.onChangeComments(rowId, row.comments);
    this.props.onChangeRespondentType(rowId, row.respondent_type);
  }
  render() {
    return <AssessmentEntryRowView {...this.props} />;
  }
}

SetDefaultValues.propTypes = {
  row: PropTypes.object,
  rowId: PropTypes.any,
  onChangeGroupValue: PropTypes.func,
  onChangeDateOfVisit: PropTypes.func,
  onChangeComments: PropTypes.func,
  onChangeRespondentType: PropTypes.func,
  defaultRespondentType: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const boundary = state.assessmentEntry.students.find((student) => {
    return ownProps.boundaryId === student.id;
  });
  const { answergroups } = state.answergroups;
  const row = get(answergroups, [ownProps.boundaryId, ownProps.rowId], {});
  const answers = get(state.answers.answers, ownProps.rowId, []);
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});
  const { isAdmin, id } = state.profile;
  const canView = checkAnswergroupPermission(isAdmin, id, row.created_by);
  const questionValues = Object.values(state.questions.questions);
  const questions = orderBy(questionValues, ['sequence'], ['asc']);

  return {
    groupValue: get(state.assessmentEntry, ['groupValues', ownProps.rowId], ''),
    dateOfVisit: get(state.assessmentEntry, ['dateOfVisits', ownProps.rowId], new Date()),
    comment: get(state.assessmentEntry, ['comments', ownProps.rowId], ''),
    respondentTypeVal: get(state.assessmentEntry, ['respondentTypeVals', ownProps.rowId], ''),
    questions,
    id: get(boundary, 'id', ''),
    name: `${get(boundary, 'first_name', '')} ${get(boundary, 'last_name', '')}`,
    answers,
    answergroupId: ownProps.rowId,
    commentRequired: get(assessment, 'comments_required'),
    groupText: get(assessment, 'group_text'),
    disabled: !canView,
    respondentTypes: filterRespondentTypes(state.respondentTypes.types),
    respondentTypeRequired: get(assessment, 'respondenttype_required'),
  };
};

const AssessmentEntryRow = connect(mapStateToProps, {
  onChange: onChangeAnswer,
  onSave: editAnswerGroup,
  onChangeGroupValue,
  onChangeDateOfVisit,
  infoNotification,
  onChangeComments,
  onChangeRespondentType,
})(SetDefaultValues);

export { AssessmentEntryRow };
