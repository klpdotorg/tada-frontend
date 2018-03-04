import { connect } from 'react-redux';
import { get } from 'lodash';

import { AssessmentRow } from '../../components/Assessments';
import { openEditAssessmentModal } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const selectedProgramId = state.programs.selectedProgram;
  return {
    assessment: get(state.assessments.assessments, ownProps.id, {}),
    url: `programs/${selectedProgramId}/assessments/${ownProps.id}/questions`,
  };
};

const Assessment = connect(mapStateToProps, { openEditAssessmentModal })(AssessmentRow);

export { Assessment };
