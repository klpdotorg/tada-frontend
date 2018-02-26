import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';

import {
  modifyBoundary,
  deleteBoundary,
  enableSubmitForm,
  disableSubmitForm,
  showConfirmModal,
  closeConfirmModal,
} from '../../actions';
import ConfirmModal from '../../components/Modals/Confirm';

const { Input } = FRC;

class EditCircleForm extends Component {
  constructor() {
    super();

    this.saveCircle = this.saveCircle.bind(this);
    this.deleteCircle = this.deleteCircle.bind(this);
  }

  saveCircle() {
    const myform = this.myform.getModel();
    this.props.saveCircle(this.props.circle.id, myform.ClusterName);
  }

  deleteCircle() {
    const { circle, projectId, deleteCircle } = this.props;

    deleteCircle(circle.id, projectId);
  }

  render() {
    const { hasSchools, circle, canSubmit, openConfirmModal } = this.props;

    return (
      <div>
        {hasSchools ? (
          <div className="alert alert-info">
            <i className="fa fa-info-circle fa-lg" aria-hidden="true" /> You cannot delete this
            boundary until its children are deleted
          </div>
        ) : (
          <div />
        )}
        <h4 className="text-primary col-md-10">Modify Details</h4>
        <button
          className="btn btn-green pull-right"
          title="Add Preschool"
          onClick={this.props.toggleSchoolModal}
        >
          Add Preschool
        </button>
        <div className="base-spacing-mid border-base" />
        <Formsy.Form
          onValidSubmit={this.saveCircle}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => { return (this.myform = ref); }}
        >
          <Input
            name="circleName"
            id="circleName"
            value={circle.name}
            label="Circle :"
            type="text"
            className="form-control"
            required
            validations="minLength:1"
          />
        </Formsy.Form>
        <div className="col-md-8">
          <button
            type="submit"
            disabled={!canSubmit}
            className="btn btn-primary padded-btn"
            onClick={this.saveCircle}
          >
            Save
          </button>
          <button
            type="submit"
            className="btn btn-primary padded-btn"
            onClick={this.props.showConfirmModal}
          >
            Delete
          </button>
          <ConfirmModal
            isOpen={openConfirmModal}
            onAgree={this.deleteCircle}
            onCloseModal={this.props.closeConfirmModal}
            entity={circle.name}
          />
        </div>
      </div>
    );
  }
}

EditCircleForm.propTypes = {
  hasSchools: PropTypes.bool,
  canSubmit: PropTypes.bool,
  openConfirmModal: PropTypes.bool,
  circle: PropTypes.object,
  projectId: PropTypes.number,
  saveCircle: PropTypes.func,
  deleteCircle: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  toggleSchoolModal: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  showConfirmModal: PropTypes.func,
  closeConfirmModal: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { circleNodeId } = ownProps;
  const institutionIds = state.boundaries.boundariesByParentId[circleNodeId];
  const hasSchools = institutionIds && institutionIds.length > 0;
  return {
    hasSchools,
    openConfirmModal: state.appstate.confirmModal,
    canSubmit: state.appstate.enableSubmitForm,
    circle: state.boundaries.boundaryDetails[circleNodeId],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSchoolModal: () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: 'createPreschool',
      });
    },
    saveCircle: (circleId, circleName) => {
      dispatch(modifyBoundary(circleId, circleName));
    },
    deleteCircle: (circleId, projectId) => {
      dispatch(deleteBoundary(circleId, projectId));
    },
    enableSubmitForm: () => {
      dispatch(enableSubmitForm());
    },
    disableSubmitForm: () => {
      dispatch(disableSubmitForm());
    },
    showConfirmModal: () => {
      dispatch(showConfirmModal());
    },
    closeConfirmModal: () => {
      dispatch(closeConfirmModal());
    },
  };
};

const EditCircle = connect(mapStateToProps, mapDispatchToProps)(EditCircleForm);

export { EditCircle };
