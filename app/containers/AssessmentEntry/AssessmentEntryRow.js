import { connect } from 'react-redux';
import { get } from 'lodash';

import { AssessmentEntryRowView } from '../../components/AssessmentEntry';
import { onChangeAssessmentEntry, saveAnswer } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const { boundaryIds } = state.assessmentEntry;
  const boundaries = boundaryIds.map((id) => {
    return { uniqueId: id, boundary: state.boundaries.boundaryDetails[id] };
  });

  const boundary = boundaries.find((value) => {
    return value.uniqueId === ownProps.id;
  });

  return {
    questions: state.questions.questions,
    id: get(boundary, 'boundary.id', ''),
    name: get(boundary, 'boundary.name', ''),
    answers: state.assessmentEntry.answers,
  };
};

const AssessmentEntryRow = connect(mapStateToProps, {
  onChange: onChangeAssessmentEntry,
  onSave: saveAnswer,
})(AssessmentEntryRowView);

export { AssessmentEntryRow };
