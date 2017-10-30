import React, { Component } from 'react';
import { connect } from 'react-redux';
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';

import ConfirmModal from '../../components/Modals/Confirm';
import {
  enableSubmitForm,
  disableSubmitForm,
  modifyBoundary,
  deleteBoundary,
  openNode,
  fetchEntitiesFromServer,
  selectPreschoolTree,
  showConfirmModal,
  closeConfirmModal,
} from '../../actions';

const { Input } = FRC;

class EditDistrictForm extends Component {

  saveDistrict() {
    const myform = this.myform.getModel();

    this.props.saveDistrict(this.districtId, myform.DistrictName);
  }

  render() {
    const { boundary, hasBlocks, districtId } = this.props;

    const boundaryType = boundary.boundary_type;

    return (
      <div>
        {hasBlocks
          ? <div className="alert alert-info">
              <i className="fa fa-info-circle fa-lg" aria-hidden="true" /> You cannot delete this
              boundary until its children are deleted
            </div>
          : <div />}
        <h4 className="text-primary col-md-10">Modify Details</h4>
        {boundaryType === 2
          ? <button
            className="btn btn-green pull-right"
            title="Add Project"
            onClick={this.props.toggleProjectModal}
          >
              Add Project
            </button>
          : <button
            className="btn btn-orange pull-right"
            title="Add Block"
            onClick={this.props.toggleBlockModal}
          >
              Add Block
            </button>}
        <div className="base-spacing-mid border-base" />
        <Formsy.Form
          onValidSubmit={this.saveDistrict}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={ref => (this.myform = ref)}
        >
          <div className="base-spacing-sm" />
          <Input
            name="DistrictName"
            id="DistrictName"
            value={boundary.name}
            type="text"
            label="District Name:"
            placeholder="Please enter the district name"
            className="form-control"
            required
            validations={{
              textValidation(values, value) {
                return value.match(/^[a-zA-Z0-9 ]*$/g) ? true : 'Please enter text only';
              },
            }}
          />
        </Formsy.Form>
        <div className="col-md-8">
          <button
            type="button"
            disabled={!this.props.canSubmit}
            className="btn btn-primary padded-btn"
            onClick={this.saveDistrict}
          >
            Save
          </button>
          <button
            type="submit"
            className="btn btn-primary padded-btn"
            onClick={() => {
              this.props.showConfirmModal();
            }}
            disabled={hasBlocks}
          >
            Delete
          </button>
          <ConfirmModal
            isOpen={this.props.confirmModal}
            onAgree={() => {
              this.props.deleteDistrict(districtId, boundary.parent);
            }}
            onCloseModal={this.props.closeConfirmModal}
            entity={boundary.name}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { districtId } = ownProps;

  return {
    canSubmit: state.appstate.enableSubmitForm,
    boundary: state.boundaries.boundaryDetails[districtId],
    hasBlocks: state.boundaries[districtId] && state.boundaries[districtId].length,
    confirmModal: state.appstate.confirmModal,
  };
};

const mapDispatchToProps = dispatch => ({
  toggleBlockModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createBlock',
    });
  },
  toggleProjectModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createProject',
    });
  },
  showConfirmModal: () => {
    dispatch(showConfirmModal());
  },
  closeConfirmModal: () => {
    dispatch(closeConfirmModal());
  },
  enableSubmitForm: () => {
    dispatch(enableSubmitForm());
  },
  disableSubmitForm: () => {
    dispatch(disableSubmitForm());
  },
  saveDistrict: (districtId, name) => {
    dispatch(modifyBoundary(districtId, name));
  },
  deleteDistrict(districtId, parentId) {
    dispatch(deleteBoundary(this.districtId, parentId));
  },
  fetchEntities: (districtId, boundaryType) => {
    dispatch(openNode(districtId));
    dispatch(fetchEntitiesFromServer(districtId));
    if (boundaryType === 2) {
      dispatch(selectPreschoolTree());
    }
  },
});

EditDistrictForm.propTypes = {
  canSubmit: PropTypes.bool,
  boundary: PropTypes.object,
  hasBlocks: PropTypes.bool,
  confirmModal: PropTypes.bool,
  districtId: PropTypes.string,
  toggleBlockModal: PropTypes.func,
  toggleProjectModal: PropTypes.func,
  showConfirmModal: PropTypes.func,
  closeConfirmModal: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  saveDistrict: PropTypes.func,
  fetchEntities: PropTypes.func,
  deleteDistrict: PropTypes.func,
};

const EditDistrict = connect(mapStateToProps, mapDispatchToProps)(EditDistrictForm);

export { EditDistrict };
