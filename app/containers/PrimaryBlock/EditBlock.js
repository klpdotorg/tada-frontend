import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

const { Input } = FRC;

class EditBlockForm extends Component {
  constructor() {
    super();

    this.onClickSaveBlock = this.onClickSaveBlock.bind(this);
    this.onClickDeleteBlock = this.onClickDeleteBlock.bind(this);
  }

  onClickSaveBlock() {
    const myform = this.myform.getModel();
    this.props.saveBlock(this.props.districtNodeId, this.props.block.id, myform.BlockName);
  }

  onClickDeleteBlock() {
    this.props.deleteBlock(this.props.block.id, this.props.districtId);
  }

  render() {
    const { hasClusters, block } = this.props;

    return (
      <div>
        {hasClusters ? (
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
        >
          Add Cluster
        </button>
        <div className="base-spacing-mid border-base" />
        <Formsy.Form
          onValidSubmit={this.onClickSaveBlock}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={(ref) => {
            return (this.myform = ref);
          }}
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
            disabled={!this.props.canSubmit}
            className="btn btn-primary padded-btn"
            onClick={this.onClickSaveBlock}
          >
            Save
          </button>
          <button
            type="submit"
            className="btn btn-primary padded-btn"
            disabled={hasClusters}
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
  block: PropTypes.object,
  districtId: PropTypes.number,
  districtNodeId: PropTypes.string,
  hasClusters: PropTypes.bool,
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
  const clusterIds = state.boundaries.boundariesByParentId[blockNodeId];
  const hasClusters = clusterIds && clusterIds.length > 0;
  return {
    block: state.boundaries.boundaryDetails[blockNodeId] || {},
    hasClusters,
    openConfirmModal: state.appstate.confirmModal,
    canSubmit: state.appstate.enableSubmitForm,
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
