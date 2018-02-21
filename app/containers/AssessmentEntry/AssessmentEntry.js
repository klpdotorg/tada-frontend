import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchStudentsAndPrograms, fetchAnswersAndQuestion } from '../../actions';
import { AnswersSheet } from '../../components/AssessmentEntry';

const mapStateToProps = (state) => {
  const { selectedProgramAssess } = state.assessmentEntry;

  return {
    selectedProgram: Number(state.programs.selectedProgram),
    selectedProgramAssess: !isEmpty(selectedProgramAssess),
  };
};

const AssessmentEntry = connect(mapStateToProps, {
  fetchStudentsAndPrograms,
  fetchAnswersAndQuestion,
})(AnswersSheet);

export { AssessmentEntry };
