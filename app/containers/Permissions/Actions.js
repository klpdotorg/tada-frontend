import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import { ActionsView } from '../../components/Permissions';
import { submitBoundaryPermissions, submitAssessmentPermissions } from '../../actions';

const mapStateToProps = (state) => {
  const { selectedBoundaries, selectedAssessments, selectedUsers } = state.permissions;

  return {
    disabledBoundary: isEmpty(selectedBoundaries) || isEmpty(selectedUsers),
    disabledAssessment: isEmpty(selectedAssessments) || isEmpty(selectedUsers),
  };
};

const Actions = connect(mapStateToProps, {
  submitBoundary: submitBoundaryPermissions,
  submitAssessment: submitAssessmentPermissions,
})(ActionsView);

export { Actions };
