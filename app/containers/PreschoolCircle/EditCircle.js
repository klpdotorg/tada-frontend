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
  toggleCreateCircleModal,
  openDeleteBoundaryModal,
} from '../../actions';
import { Confirm } from '../Modal';

const { Input } = FRC;

class EditCircleForm extends Component {
  constructor() {
    super();

    this.saveCircle = this.saveCircle.bind(this);
    this.deleteCircle = this.deleteCircle.bind(this);
  }

  saveCircle() {
    const myform = this.myform.getModel();
    this.props.saveCircle(this.props.circle.id, myform.circleName);
  }

  deleteCircle() {
    const { circle, projectId, deleteCircle } = this.props;

    deleteCircle(circle.id, projectId);
  }

  render() {
    const { hasSchools, circle, canSubmit } = this.props;

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
          ref={(ref) => {
            return (this.myform = ref);
          }}
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
            onClick={() => {
              this.saveCircle(circle.name);
            }}
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
          <Confirm onYes={this.deleteCircle} />
        </div>
      </div>
    );
  }
}

EditCircleForm.propTypes = {
  hasSchools: PropTypes.bool,
  canSubmit: PropTypes.bool,
  circle: PropTypes.object,
  projectId: PropTypes.number,
  saveCircle: PropTypes.func,
  deleteCircle: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  toggleSchoolModal: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  showConfirmModal: PropTypes.func,
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

const EditCircle = connect(mapStateToProps, {
  toggleSchoolModal: toggleCreateCircleModal,
  saveCircle: modifyBoundary,
  deleteCircle: deleteBoundary,
  enableSubmitForm,
  disableSubmitForm,
  showConfirmModal: openDeleteBoundaryModal,
})(EditCircleForm);

export { EditCircle };
