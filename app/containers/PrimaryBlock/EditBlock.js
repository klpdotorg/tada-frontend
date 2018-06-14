import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';

import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';

import { Confirm } from '../Modal';
import {
  modifyBoundary,
  enableSubmitForm,
  disableSubmitForm,
  deleteBoundary,
  openDeleteBoundaryModal,
  toggleCreateClusterModal,
} from '../../actions';
import { hasChildren, checkPermissions } from '../../utils';

const { Input } = FRC;

class EditBlockForm extends Component {
  constructor() {
    super();

    this.onClickSaveBlock = this.onClickSaveBlock.bind(this);
    this.onClickDeleteBlock = this.onClickDeleteBlock.bind(this);
  }

  onClickSaveBlock() {
    const myform = this.myform.getModel();
    this.props.saveBlock(this.props.block.id, myform.BlockName);
  }

  onClickDeleteBlock() {
    const { blockNodeId, block, districtNodeId } = this.props;

    const params = {
      boundaryNodeId: blockNodeId,
      boundaryId: block.id,
      parentId: districtNodeId,
    };
    this.props.deleteBlock(params);
  }

  render() {
    const { canDelete, block, hasPermissions } = this.props;
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
          className="btn btn-orange pull-right"
          title="Add Cluster"
          onClick={this.props.toggleClusterModal}
          disabled={!hasPermissions}
        >
          Add Cluster
        </button>
        <div className="base-spacing-mid border-base" />
        <Formsy.Form
          onValidSubmit={this.onClickSaveBlock}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            this.myform = ref;
          }}
          disabled={!hasPermissions}
        >
          <Input
            name="BlockName"
            id="BlockName"
            value={block.name}
            label="Block :"
            type="text"
            placeholder="Please enter the block name"
            className="form-control"
            required
            validations="minLength:1"
          />
        </Formsy.Form>
        <div className="col-md-8">
          <button
            type="submit"
            disabled={!hasPermissions || !this.props.canSubmit}
            className="btn btn-primary padded-btn"
            onClick={this.onClickSaveBlock}
          >
            Save
          </button>
          <button
            type="submit"
            className="btn btn-primary padded-btn"
            disabled={!canDelete}
            onClick={() => {
              this.props.showConfirmModal(block.name);
            }}
          >
            Delete
          </button>
          <Confirm onYes={this.onClickDeleteBlock} />
        </div>
      </div>
    );
  }
}

EditBlockForm.propTypes = {
  hasPermissions: PropTypes.bool,
  block: PropTypes.object,
  districtNodeId: PropTypes.string,
  blockNodeId: PropTypes.string,
  canDelete: PropTypes.bool,
  canSubmit: PropTypes.bool,
  saveBlock: PropTypes.func,
  toggleClusterModal: PropTypes.func,
  deleteBlock: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  showConfirmModal: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { blockNodeId } = ownProps;
  const { boundaries } = state;
  const { isAdmin } = state.profile;
  const block = get(boundaries.boundaryDetails, blockNodeId, {});
  const hasPermissions = checkPermissions(isAdmin, state.userPermissions, [block.id]);

  return {
    block,
    canDelete: isAdmin && hasChildren(blockNodeId, boundaries),
    openConfirmModal: state.appstate.confirmModal,
    canSubmit: state.appstate.enableSubmitForm,
    hasPermissions,
  };
};

const EditBlock = connect(mapStateToProps, {
  toggleClusterModal: toggleCreateClusterModal,
  saveBlock: modifyBoundary,
  deleteBlock: deleteBoundary,
  enableSubmitForm,
  disableSubmitForm,
  showConfirmModal: openDeleteBoundaryModal,
})(EditBlockForm);

export { EditBlock };
