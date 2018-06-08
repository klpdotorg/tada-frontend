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
} from '../../actions';

class SetDefaultValues extends Component {
  componentDidMount() {
    const { rowId, row } = this.props;
    this.props.onChangeGroupValue(rowId, row.group_value);
    this.props.onChangeDateOfVisit(rowId, new Date(row.date_of_visit));
  }
  render() {
    return <AssessmentEntryRowView {...this.props} />;
  }
}

SetDefaultValues.propTypes = {
  row: PropTypes.object,
  rowId: PropTypes.number,
  onChangeGroupValue: PropTypes.func,
  onChangeDateOfVisit: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const boundary = state.assessmentEntry.students.find((student) => {
    return ownProps.boundaryId === student.id;
  });
  const answers = get(state.answers.answers, ownProps.rowId, []);

  return {
    groupValue: get(state.assessmentEntry, ['groupValues', ownProps.rowId], ''),
    dateOfVisit: get(state.assessmentEntry, ['dateOfVisits', ownProps.rowId], new Date()),
    questions: state.questions.questions,
    id: get(boundary, 'id', ''),
    name: `${get(boundary, 'first_name', '')} ${get(boundary, 'last_name', '')}`,
    answers,
  };
};

const AssessmentEntryRow = connect(mapStateToProps, {
  onChange: onChangeAnswer,
  onSave: editAnswerGroup,
  onChangeGroupValue,
  onChangeDateOfVisit,
})(SetDefaultValues);

export { AssessmentEntryRow };
