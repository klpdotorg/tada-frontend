import { connect } from 'react-redux';
import { get } from 'lodash';

import { EditDistrictForm } from '../common';
import {
  enableSubmitForm,
  disableSubmitForm,
  modifyBoundary,
  deleteBoundary,
  toggleProjectModal,
  toggleBlockModal,
  openDeleteBoundaryModal,
} from '../../actions';
import { hasChildren, checkPermissions } from '../../utils';

const mapStateToProps = (state, ownProps) => {
  const { districtNodeId } = ownProps;
  const { boundaries } = state;
  const { isAdmin } = state.profile;
  const boundary = get(boundaries.boundaryDetails, districtNodeId, {});
  const hasPermissions = checkPermissions(isAdmin, state.userPermissions, boundary);

  return {
    canSubmit: state.appstate.enableSubmitForm,
    boundary,
    canDelete: !isAdmin && hasChildren(districtNodeId, boundaries),
    confirmModal: state.appstate.confirmModal,
    primary: state.schoolSelection.primarySchool,
    hasPermissions,
  };
};

const EditDistrict = connect(mapStateToProps, {
  toggleProjectModal,
  toggleBlockModal,
  showConfirmModal: openDeleteBoundaryModal,
  enableSubmitForm,
  disableSubmitForm,
  saveDistrict: modifyBoundary,
  deleteDistrict: deleteBoundary,
})(EditDistrictForm);

export { EditDistrict };
