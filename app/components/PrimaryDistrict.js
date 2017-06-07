import React from 'react';
import Button from './Button';
import {
  modifyBoundary,
  deleteBoundary,
  saveNewBlock,
  saveNewProject,
  selectPreschoolTree,
  openNode,
  fetchEntitiesFromServer,
} from '../actions';
import CreateBoundary from './Modals/CreateBoundary';
import { Link } from 'react-router';
import ConfirmModal from './Modals/Confirm';
import Notifications from 'react-notification-system-redux';
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';

const { Input } = FRC;

export default class PrimaryDistrict extends React.Component {
  constructor(props) {
    super(props);
    this.saveDistrict = this.saveDistrict.bind(this);
    this.deleteDistrict = this.deleteDistrict.bind(this);
    this.toggleBlockModal = this.toggleBlockModal.bind(this);
    this.toggleProjectModal = this.toggleProjectModal.bind(this);
    this.saveBlock = this.saveBlock.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.districtId = this.props.params.districtId;
    this.hasChildren = this.hasChildren.bind(this);
    this.state = {
      value: '',
      disabled: false,
      canSubmit: false,
      openConfirmModal: false,
    };
  }

  componentDidMount() {
    const { params, dispatch } = this.props;
    dispatch(openNode(params.districtId));
    dispatch(fetchEntitiesFromServer(params.districtId));
    if (this.props.boundaryDetails[this.props.params.districtId].boundary_type === 2) {
      dispatch(selectPreschoolTree());
    }
  }

  saveDistrict() {
    var myform = this.myform.getModel();
    this.props.dispatch(modifyBoundary(this.districtId, myform.DistrictName));
  }

  showConfirmation = () => {
    this.setState({
      openConfirmModal: true,
    });
  };

  deleteDistrict(parentId) {
    this.props.dispatch(deleteBoundary(this.districtId, parentId))

  }

  saveBlock(name) {
    const options = {
      name,
      parent: this.districtId,
      boundary_type: 1,
      boundary_category: 10,
    };
    this.props.dispatch(saveNewBlock(options));
  }

  saveProject(name) {
    const options = {
      name,
      parent: this.districtId,
      boundary_type: 2,
      boundary_category: 14,
    };
    this.props.dispatch(saveNewProject(options));
  }

  toggleBlockModal() {
    this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createBlock',
    });
  }

  toggleProjectModal() {
    this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createProject',
    });
  }

  closeConfirmModal = () => {
    this.setState({
      openConfirmModal: false,
    });
  };

  enableSubmitButton = () => {
    this.setState({
      canSubmit: true,
    });
  };

  disableSubmitButton = () => {
    this.setState({
      canSubmit: false,
    });
  };

  hasChildren() {
    if (this.props.boundariesByParentId[this.props.params.districtId]) {
      return this.props.boundariesByParentId[this.props.params.districtId].length > 0;
    } else return false;
  }

  DistrictSummary = props => {
    var boundary = this.props.boundaryDetails[this.props.params.districtId];

    if (!boundary) return null;
    var boundaryType = boundary.boundary_type;
    var DistrictSummary;
    this.state.value = boundary.name;
    let hasBlocks = this.hasChildren();
    if (sessionStorage.getItem('isAdmin')) {
      return (
        <div>
          {hasBlocks
            ? <div className="alert alert-info">
                <i className="fa fa-info-circle fa-lg" aria-hidden="true" />
                {' '}
                You cannot delete this boundary until its children are deleted
              </div>
            : <div />}
          <h4 className="text-primary col-md-10">Modify Details</h4>
          {boundaryType == 2
            ? <button
                className="btn btn-green pull-right"
                title="Add Project"
                onClick={this.toggleProjectModal}
              >
                Add Project
              </button>
            : <button
                className="btn btn-orange pull-right"
                title="Add Block"
                onClick={this.toggleBlockModal}
              >
                Add Block
              </button>}
          <div className="base-spacing-mid border-base" />
          <Formsy.Form
            onValidSubmit={this.saveDistrict}
            onValid={this.enableSubmitButton}
            onInvalid={this.disableSubmitButton}
            ref={ref => (this.myform = ref)}
          >
            <div className="base-spacing-sm" />
            <Input
              name="DistrictName"
              id="DistrictName"
              value={boundary.name}
              label="District Name:"
              type="text"
              placeholder="Please enter the district name"
              className="form-control"
              required
              validations="minLength:1"
            />
          </Formsy.Form>
              <div className="col-md-8">
                <button type="button" disabled={!this.state.canSubmit} className="btn btn-primary padded-btn" onClick={this.saveDistrict}>Save</button>
                <button type="submit" className="btn btn-primary padded-btn" onClick={() => {this.showConfirmation() }} disabled={hasBlocks}>Delete</button>
                <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={() => {this.deleteDistrict(boundary.parent)}} onCloseModal={this.closeConfirmModal} entity={boundary.name}/>
              </div>

        </div>
      );
    } else {
      return (
        <div>
          <div className="alert alert-danger">
            <i className="fa fa-lock fa-lg" aria-hidden="true"></i>
             Insufficient Privileges. Only administrators can modify boundary details.
          </div>
          <h4 className="text-primary">District</h4>
          <div className="border-base"></div>
          <div className="base-spacing-mid"></div>
          <div>{boundary.name}</div>
        </div>
      );
    }
  };
  render() {
    var boundary = this.props.boundaryDetails[this.props.params.districtId];
    if (!boundary) return null;
    var boundaryType = boundary.boundary_type;
    var DistrictSummary;
    this.state.value = boundary.name;

    return (
      <div>
        <ol className="breadcrumb">
          <li className="active">{boundary.name}</li>
        </ol>
        {this.DistrictSummary()}
        <CreateBoundary
          placeHolder="Block Name"
          title="Create New Block"
          isOpen={this.props.modal.createBlock}
          onCloseModal={this.toggleBlockModal}
          save={this.saveBlock}
        />
        <CreateBoundary
          placeHolder="Project Name"
          title="Create New Project"
          isOpen={this.props.modal.createProject}
          onCloseModal={this.toggleProjectModal}
          save={this.saveProject}
        />
      </div>
    );
  }
}
