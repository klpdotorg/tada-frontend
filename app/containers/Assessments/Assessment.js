import { connect } from 'react-redux';
import get from 'lodash.get';

import { AssessmentRow } from '../../components/Assessments';
import { openEditAssessmentModal, redirect, selectAssessment } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const selectedProgramId = state.programs.selectedProgram;
  const { selectedAssessments } = state.assessments;
  const { isAdmin, groups } = state.profile;

  return {
    assessment: get(state.assessments.assessments, ownProps.id, {}),
    url: `programs/${selectedProgramId}/assessments/${ownProps.id}/questions`,
    selectedAssessments,
    isAdmin,
    groups,
  };
};

const Assessment = connect(mapStateToProps, {
  openEditAssessmentModal,
  redirect,
  selectAssessment,
})(AssessmentRow);

export { Assessment };
