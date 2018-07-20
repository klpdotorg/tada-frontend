import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import PropTypes from 'prop-types';

import { AssessmentEntryRowView } from '../../components/StudentAssessmentEntry';
import {
  onChangeAnswer,
  editAnswerGroup,
  onChangeDateOfVisit,
  onChangeGroupValue,
  infoNotification,
  onChangeComments,
} from '../../actions';

class SetDefaultValues extends Component {
  componentDidMount() {
    const { rowId, row } = this.props;
    this.props.onChangeGroupValue(rowId, row.group_value);
    this.props.onChangeDateOfVisit(rowId, new Date(row.date_of_visit));
    this.props.onChangeComments(rowId, row.comments);
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
};

const mapStateToProps = (state, ownProps) => {
  const boundary = state.assessmentEntry.students.find((student) => {
    return ownProps.boundaryId === student.id;
  });
  const answers = get(state.answers.answers, ownProps.rowId, []);
  const assessment = get(state.assessments.assessments, ownProps.assessmentId, {});

  return {
    groupValue: get(state.assessmentEntry, ['groupValues', ownProps.rowId], ''),
    dateOfVisit: get(state.assessmentEntry, ['dateOfVisits', ownProps.rowId], new Date()),
    comment: get(state.assessmentEntry, ['comments', ownProps.rowId], ''),
    questions: state.questions.questions,
    id: get(boundary, 'id', ''),
    name: `${get(boundary, 'first_name', '')} ${get(boundary, 'last_name', '')}`,
    answers,
    answergroupId: ownProps.rowId,
    commentRequired: get(assessment, 'comments_required'),
  };
};

const AssessmentEntryRow = connect(mapStateToProps, {
  onChange: onChangeAnswer,
  onSave: editAnswerGroup,
  onChangeGroupValue,
  onChangeDateOfVisit,
  infoNotification,
  onChangeComments,
})(SetDefaultValues);

export { AssessmentEntryRow };
