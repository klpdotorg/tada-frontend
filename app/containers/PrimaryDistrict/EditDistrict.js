import { connect } from 'react-redux';

import { EditDistrictForm } from '../common';
import {
  enableSubmitForm,
  disableSubmitForm,
  modifyBoundary,
  deleteBoundary,
  showConfirmModal,
  closeConfirmModal,
  toggleProjectModal,
  toggleBlockModal,
} from '../../actions';

const mapStateToProps = (state, ownProps) => {
  const { districtNodeId } = ownProps;

  return {
    canSubmit: state.appstate.enableSubmitForm,
    boundary: state.boundaries.boundaryDetails[districtNodeId],
    hasBlocks: state.boundaries[districtNodeId] && state.boundaries[districtNodeId].length,
    confirmModal: state.appstate.confirmModal,
    primary: state.schoolSelection.primarySchool,
  };
};

const EditDistrict = connect(mapStateToProps, {
  toggleProjectModal,
  toggleBlockModal,
  showConfirmModal,
  closeConfirmModal,
  enableSubmitForm,
  disableSubmitForm,
  saveDistrict: modifyBoundary,
  deleteDistrict: deleteBoundary,
})(EditDistrictForm);

export { EditDistrict };
