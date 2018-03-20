import { connect } from 'react-redux';
import { get } from 'lodash';

import { AssessmentRow } from '../../components/Assessments';
import { openEditAssessmentModal, redirect, selectAssessment } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const selectedProgramId = state.programs.selectedProgram;
  const { selectedAssessments } = state.assessments;
  return {
    assessment: get(state.assessments.assessments, ownProps.id, {}),
    url: `programs/${selectedProgramId}/assessments/${ownProps.id}/questions`,
    selectedAssessments,
  };
};

const Assessment = connect(mapStateToProps, {
  openEditAssessmentModal,
  redirect,
  selectAssessment,
})(AssessmentRow);

export { Assessment };
