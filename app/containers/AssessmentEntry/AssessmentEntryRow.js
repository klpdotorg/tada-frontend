import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import PropTypes from 'prop-types';

import { AssessmentEntryRowView } from '../../components/AssessmentEntry';
import {
  onChangeAnswer,
  editAnswerGroup,
  onChangeDateOfVisit,
  onChangeGroupValue,
  infoNotification,
} from '../../actions';

class SetDefaultValues extends Component {
  componentDidMount() {
    const { answergroupId, row } = this.props;
    this.props.onChangeGroupValue(answergroupId, row.group_value);
    this.props.onChangeDateOfVisit(answergroupId, new Date(row.date_of_visit));
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
};

const mapStateToProps = (state, ownProps) => {
  const { rowId } = ownProps;
  const { answergroups } = state.answergroups;
  const row = get(answergroups, [ownProps.boundaryInfo.boundaryId, rowId], {});
  const boundary = get(state.programDetails.programDetails, ownProps.uniqueId, {});
  const answers = get(state.answers.answers, rowId, []);

  return {
    row,
    answergroupId: row.id,
    groupValue: get(state.assessmentEntry, ['groupValues', row.id], ''),
    dateOfVisit: get(state.assessmentEntry, ['dateOfVisits', row.id], new Date()),
    questions: state.questions.questions,
    id: get(boundary, 'id', ''),
    name: get(boundary, 'name', ''),
    answers,
    rowId,
  };
};

const AssessmentEntryRow = connect(mapStateToProps, {
  onChange: onChangeAnswer,
  onSave: editAnswerGroup,
  onChangeGroupValue,
  onChangeDateOfVisit,
  infoNotification,
})(SetDefaultValues);

export { AssessmentEntryRow };
