import { connect } from 'react-redux';

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
import { hasChildren } from '../../utils';

const mapStateToProps = (state, ownProps) => {
  const { districtNodeId } = ownProps;
  const { boundaries } = state;

  return {
    canSubmit: state.appstate.enableSubmitForm,
    boundary: boundaries.boundaryDetails[districtNodeId],
    canDelete: hasChildren(districtNodeId, boundaries),
    confirmModal: state.appstate.confirmModal,
    primary: state.schoolSelection.primarySchool,
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
