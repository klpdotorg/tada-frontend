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
    this.showConfirmation = this.showConfirmation.bind(this);

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

  showConfirmation() {
    this.setState({
      openConfirmModal: true,
    });
  }

  deleteDistrict(parentId) {
    this.props.dispatch(deleteBoundary(this.districtId, parentId));
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
          <li className="active">
            {boundary.name}
          </li>
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
