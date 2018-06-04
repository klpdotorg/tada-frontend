import { connect } from 'react-redux';
import get from 'lodash.get';

import { AssessmentEntryRowView } from '../../components/AssessmentEntry';
import { onChangeAnswer, editAnswers } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const { rowId } = ownProps;
  const { answergroups } = state.answergroups;
  const row = get(answergroups, [ownProps.boundaryInfo.boundaryId, rowId], {});
  const boundary = get(state.programDetails.programDetails, ownProps.uniqueId, {});
  const answers = get(state.answers.answers, rowId, []);

  return {
    answergroupId: row.id,
    groupValue: row.group_value,
    dateOfVisit: row.date_of_visit,
    questions: state.questions.questions,
    id: get(boundary, 'id', ''),
    name: get(boundary, 'name', ''),
    answers,
    rowId,
  };
};

const AssessmentEntryRow = connect(mapStateToProps, {
  onChange: onChangeAnswer,
  onSave: editAnswers,
})(AssessmentEntryRowView);

export { AssessmentEntryRow };
