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
  setParentNode,
} from '../../actions';
import ConfirmModal from '../../components/Modals/Confirm';

const { Input } = FRC;

class EditClusterView extends Component {
  constructor() {
    super();

    this.saveCluster = this.saveCluster.bind(this);
    this.deleteCluster = this.deleteCluster.bind(this);
  }

  saveCluster() {
    const myform = this.myform.getModel();
    this.props.saveCluster(this.props.blockNodeId, this.props.cluster.id, myform.ClusterName);
  }

  deleteCluster() {
    const { cluster, blockId, deleteCluster } = this.props;

    deleteCluster(cluster.id, blockId);
  }

  render() {
    const { hasSchools, cluster } = this.props;

    return (
      <div>
        {hasSchools
          ?
          <div className="alert alert-info">
            <i className="fa fa-info-circle fa-lg" aria-hidden="true" /> You cannot delete this
            boundary until its children are deleted
          </div>
          :
          <div />
        }
        <h4 className="text-primary col-md-10">Modify Details</h4>
        <button
          className="btn btn-orange pull-right"
          title="Add School"
          onClick={this.props.toggleSchoolModal}
        >
          Add School
        </button>
        <div className="base-spacing-mid border-base" />
        <Formsy.Form
          onValidSubmit={this.saveCluster}
          onValid={this.props.enableSubmitForm}
          onInvalid={this.props.disableSubmitForm}
          ref={ref => (this.myform = ref)}
        >
          <Input
            name="ClusterName"
            id="ClusterName"
            value={cluster.name}
            label="Cluster :"
            type="text"
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
            onClick={this.saveCluster}
          >
            Save
          </button>
          <button
            type="submit"
            className="btn btn-primary padded-btn"
            disabled={hasSchools}
            onClick={this.props.showConfirmModal}
          >
            Delete
          </button>
          <ConfirmModal
            isOpen={this.props.openConfirmModal}
            onAgree={this.deleteCluster}
            onCloseModal={this.props.closeConfirmModal}
            entity={cluster.name}
          />
        </div>
      </div>
    );
  }
}

EditClusterView.propTypes = {
  hasSchools: PropTypes.bool,
  canSubmit: PropTypes.bool,
  openConfirmModal: PropTypes.bool,
  cluster: PropTypes.object,
  blockId: PropTypes.number,
  blockNodeId: PropTypes.string,
  saveCluster: PropTypes.func,
  deleteCluster: PropTypes.func,
  enableSubmitForm: PropTypes.func,
  toggleSchoolModal: PropTypes.func,
  disableSubmitForm: PropTypes.func,
  showConfirmModal: PropTypes.func,
  closeConfirmModal: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { clusterNodeId } = ownProps;
  const institutionIds = state.boundaries.boundariesByParentId[clusterNodeId];
  const hasSchools = institutionIds && institutionIds.length > 0;
  return {
    hasSchools,
    openConfirmModal: state.appstate.confirmModal,
    canSubmit: state.appstate.enableSubmitForm,
    cluster: state.boundaries.boundaryDetails[clusterNodeId],
  };
};

const mapDispatchToProps = dispatch => ({
  toggleSchoolModal: () => {
    dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createInstitution',
    });
  },
  saveCluster: (blockNodeId, clusterId, clusterName) => {
    dispatch(setParentNode(blockNodeId));
    dispatch(modifyBoundary(clusterId, clusterName));
  },
  deleteCluster: (clusterId, blockId) => {
    dispatch(deleteBoundary(clusterId, blockId));
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
});

const EditCluster = connect(mapStateToProps, mapDispatchToProps)(EditClusterView);

export { EditCluster };
