import { connect } from 'react-redux';
import { BoundaryAssessmentListView } from '../../components/Permissions';

import { selectPermissionsAssessment } from '../../actions';

const mapStateToProps = (state) => {
  const { assessments, loadingAssessment, selectedAssessments } = state.permissions;
  return {
    assessments: Object.values(assessments),
    loading: loadingAssessment,
    selectedAssessments,
  };
};

const BoundaryAssessmentList = connect(mapStateToProps, {
  selectAssessment: selectPermissionsAssessment,
})(BoundaryAssessmentListView);

export { BoundaryAssessmentList };
