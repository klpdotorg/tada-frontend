import { connect } from 'react-redux';
import { get } from 'lodash';

import { AssessmentEntryRowView } from '../../components/AssessmentEntry';
import { onChangeAssessmentEntry, createAnswerGroup } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;

  const boundary = {
    uniqueId: id,
    boundary: state.programDetails.programDetails[id],
  };

  return {
    questions: state.questions.questions,
    id: get(boundary, 'boundary.id', ''),
    name: get(boundary, 'boundary.name', ''),
    answers: state.assessmentEntry.answers,
  };
};

const AssessmentEntryRow = connect(mapStateToProps, {
  onChange: onChangeAssessmentEntry,
  onSave: createAnswerGroup,
})(AssessmentEntryRowView);

export { AssessmentEntryRow };
