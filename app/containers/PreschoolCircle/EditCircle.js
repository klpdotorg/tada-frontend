import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';
import { get } from 'lodash';

import {
  modifyBoundary,
  deleteBoundary,
  enableSubmitForm,
  disableSubmitForm,
  toggleCreatePreschoolModal,
  openDeleteBoundaryModal,
} from '../../actions';
import { Confirm } from '../Modal';
import { hasChildren, checkPermissions } from '../../utils';

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
    const { circleNodeId, circle, projectNodeId } = this.props;

    const params = {
      boundaryNodeId: circleNodeId,
      boundaryId: circle.id,
      parentId: projectNodeId,
    };

    this.props.deleteCircle(params);
  }

  render() {
    const { canDelete, circle, canSubmit, hasPermissions } = this.props;

    return (
      <div>
        {!hasPermissions ? (
          <div className="alert alert-danger">
            <i className="fa fa-lock fa-lg" aria-hidden="true" />
            Insufficient Privileges. Only administrators can modify boundary details.
          </div>
        ) : (
          <div />
        )}
        {hasPermissions && !canDelete ? (
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
          disabled={!hasPermissions}
        >
          Add Preschool
        </button>
        <div className="base-spacing-mid border-base" />
        <Formsy.Form
          onValidSubmit={this.saveCircle}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            this.myform = ref;
          }}
          disabled={!hasPermissions}
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
            disabled={!hasPermissions || !canSubmit}
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
            disabled={!canDelete}
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
  hasPermissions: PropTypes.bool,
  canDelete: PropTypes.bool,
  canSubmit: PropTypes.bool,
  circle: PropTypes.object,
  projectNodeId: PropTypes.string,
  circleNodeId: PropTypes.string,
  saveCircle: PropTypes.func,
  deleteCircle: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  toggleSchoolModal: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  showConfirmModal: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { circleNodeId } = ownProps;
  const { boundaries } = state;
  const circle = get(boundaries.boundaryDetails, circleNodeId, {});
  const { isAdmin } = state.profile;
  const hasPermissions = checkPermissions(isAdmin, state.userPermissions, circle.id);

  return {
    canDelete: isAdmin && hasChildren(circleNodeId, boundaries),
    openConfirmModal: state.appstate.confirmModal,
    canSubmit: state.appstate.enableSubmitForm,
    circle,
    hasPermissions,
  };
};

const EditCircle = connect(mapStateToProps, {
  toggleSchoolModal: toggleCreatePreschoolModal,
  saveCircle: modifyBoundary,
  deleteCircle: deleteBoundary,
  enableSubmitForm,
  disableSubmitForm,
  showConfirmModal: openDeleteBoundaryModal,
})(EditCircleForm);

export { EditCircle };
