import { connect } from 'react-redux';
import { get } from 'lodash';

import { AssessmentEntryRowView } from '../../components/AssessmentEntry';
import { onChangeAssessmentEntry, createAnswerGroup } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const { rowId } = ownProps;
  const { answergroups } = state.answergroups;
  const row = get(answergroups, rowId, {});
  const boundary = get(state.programDetails.programDetails, ownProps.uniqueId, {});
  const answers = get(state.answers.answers, rowId, []);

  return {
    groupValue: row.group_value,
    dateOfVisit: row.date_of_visit,
    questions: state.questions.questions,
    id: get(boundary, 'id', ''),
    name: get(boundary, 'name', ''),
    answers,
  };
};

const AssessmentEntryRow = connect(mapStateToProps, {
  onChange: onChangeAssessmentEntry,
  onSave: createAnswerGroup,
})(AssessmentEntryRowView);

export { AssessmentEntryRow };
