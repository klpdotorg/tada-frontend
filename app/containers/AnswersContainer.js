import { connect } from 'react-redux';
import AssessmentEntry from '../components/AssessmentEntry';
import * as Selectors from '../selectors/';

const mapStateToProps = (state, ownProps) => {
  return {
    studentsById: state.boundaries.boundaryDetails,
    isFetching: state.boundaries.isFetching,
    selectedProgramAssess: state.programs.selected,
    questionsByAssessId: state.assessments.questionsByAssessId,
  };
};

const AnswersContainer = connect(mapStateToProps)(AssessmentEntry);

export default AnswersContainer;
