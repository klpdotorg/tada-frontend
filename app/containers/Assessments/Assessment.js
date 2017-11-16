import { connect } from 'react-redux';

import { AssessmentRow } from '../../components/Assessments';

const mapStateToProps = (state, ownProps) => {
  const selectedProgramId = state.programs.selectedProgram;

  return {
    assessment: state.assessments.assessments[selectedProgramId][ownProps.id],
  };
};

const Assessment = connect(mapStateToProps)(AssessmentRow);

export { Assessment };
