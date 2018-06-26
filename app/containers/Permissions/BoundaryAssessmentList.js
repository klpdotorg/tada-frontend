import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

import { BoundaryAssessmentListView } from '../../components/Permissions';

import { selectPermissionsAssessment } from '../../actions';

const mapStateToProps = (state) => {
  const {
    assessments,
    loadingAssessment,
    selectedAssessments,
    selectedBoundaries,
  } = state.permissions;
  const values = Object.values(assessments).map((value) => {
    return Object.values(value);
  });

  return {
    assessments: [].concat(...values),
    loading: loadingAssessment,
    selectedAssessments,
    noSelectedBoundaries: isEmpty(selectedBoundaries),
  };
};

const BoundaryAssessmentList = connect(mapStateToProps, {
  selectAssessment: selectPermissionsAssessment,
})(BoundaryAssessmentListView);

export { BoundaryAssessmentList };
