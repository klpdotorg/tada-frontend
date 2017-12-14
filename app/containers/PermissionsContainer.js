import { connect } from 'react-redux';
import Permissions from '../components/Permissions';
import * as Selectors from '../selectors/';

const mapStateToProps = (state) => {
  return {
    selectedBoundary: state.appstate.selectedBoundary,
    boundaryDetails: state.boundaries.boundaryDetails,
    boundariesByParentId: state.boundaries.boundariesByParentId,
    users: Selectors.getNonAdminUsers(state),
    isLoading: state.users.fetchingUsers,
    assessmentsByBoundary: state.assessments.assessmentsByBoundary,
    assessmentsById: state.assessments.assessmentsById,
  };
};

const PermissionsContainer = connect(mapStateToProps)(Permissions);

export default PermissionsContainer;
