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
  const newAssessments = [].concat(...values);
  const uniqItems = newAssessments.reduce((soFar, item) => {
    const result = soFar;
    result[item.questiongroup_id] = item;

    return result;
  }, {});

  return {
    assessments: Object.values(uniqItems),
    loading: loadingAssessment,
    selectedAssessments,
    noSelectedBoundaries: isEmpty(selectedBoundaries),
  };
};

const BoundaryAssessmentList = connect(mapStateToProps, {
  selectAssessment: selectPermissionsAssessment,
})(BoundaryAssessmentListView);

export { BoundaryAssessmentList };
