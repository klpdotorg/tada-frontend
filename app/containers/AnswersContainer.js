import { connect } from 'react-redux';
import AssessmentEntry from '../components/AssessmentEntry';
import * as Selectors from '../selectors/';
import _ from 'lodash';

function sortStudentsAlpha(studentsObj) {
  let results = _.sortBy(Object.values(studentsObj), ['first_name', 'name']);
  console.log('Alpha sort..', results);
  return results;
}

const mapStateToProps = (state, ownProps) => {
  return {
    studentsById: state.boundaries.boundaryDetails,
    isFetching: state.boundaries.isFetching,
    selectedProgramAssess: state.programs.selected,
    questionsByAssessId: state.assessments.questionsByAssessId,
    answersByStudentQnId: state.assessments.answersById,
  };
};

const AnswersContainer = connect(mapStateToProps)(AssessmentEntry);

export default AnswersContainer;
