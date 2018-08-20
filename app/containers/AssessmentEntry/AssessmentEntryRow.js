import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import orderBy from 'lodash.orderby';
import Loadable from 'react-loadable';

import { checkAnswergroupPermission } from '../../utils';
import {
  onChangeAnswer,
  editAnswerGroup,
  onChangeDateOfVisit,
  onChangeGroupValue,
  infoNotification,
  onChangeComments,
  onChangeRespondentType,
} from '../../actions';
import { filterRespondentTypes } from './utils';
import { Loading } from '../../components/common';

const AssessmentEntryRowView = Loadable({
  loader: () => {
    return import('../../components/AssessmentEntry/AssessmentEntryRow');
  },
  loading: Loading,
});

class SetDefaultValues extends Component {
  componentDidMount() {
    const { answergroupId, row } = this.props;
    this.props.onChangeGroupValue(answergroupId, row.group_value);
    this.props.onChangeDateOfVisit(answergroupId, new Date(row.date_of_visit));
    this.props.onChangeComments(answergroupId, row.comments);
    this.props.onChangeRespondentType(answergroupId, row.respondent_type);
  }
  render() {
    return <AssessmentEntryRowView {...this.props} />;
  }
}

SetDefaultValues.propTypes = {
  row: PropTypes.object,
  answergroupId: PropTypes.number,
  onChangeGroupValue: PropTypes.func,
  onChangeDateOfVisit: PropTypes.func,
  onChangeComments: PropTypes.func,
  onChangeRespondentType: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { rowId } = ownProps;
  const { answergroups } = state.answergroups;
  const row = get(answergroups, [ownProps.boundaryInfo.boundaryId, rowId], {});
  const boundary = get(state.programDetails.programDetails, ownProps.uniqueId, {});
  const answers = get(state.answers.answers, rowId, []);
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});
  const { isAdmin, id } = state.profile;
  const canView = checkAnswergroupPermission(isAdmin, id, row.created_by);
  const questionValues = Object.values(state.questions.questions);
  const questions = orderBy(questionValues, ['sequence'], ['asc']);

  const defaultRespondentType = get(assessment, 'default_respondent_type');

  return {
    row,
    answergroupId: row.id,
    groupValue: get(state.assessmentEntry, ['groupValues', row.id], ''),
    dateOfVisit: get(state.assessmentEntry, ['dateOfVisits', row.id], new Date()),
    comment: get(state.assessmentEntry, ['comments', row.id], ''),
    respondentTypeVal: get(
      state.assessmentEntry,
      ['respondentTypeVals', row.id],
      defaultRespondentType,
    ),
    questions,
    id: get(boundary, 'id', ''),
    name: get(boundary, 'name', ''),
    answers,
    rowId,
    commentRequired: get(assessment, 'comments_required'),
    respondentTypes: filterRespondentTypes(state.respondentTypes.types),
    respondentTypeRequired: get(assessment, 'respondenttype_required'),
    groupText: get(assessment, 'group_text'),
    disabled: !canView,
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
