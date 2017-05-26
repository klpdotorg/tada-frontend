import React from 'react';
import Button from './Button'
import {modifyBoundary, deleteBoundary, saveNewBlock, saveNewProject, selectPreschoolTree,openNode,fetchEntitiesFromServer} from '../actions'
import CreateBoundary from './Modals/CreateBoundary'
import {Link} from 'react-router'
import ConfirmModal from './Modals/Confirm'
import Notifications from 'react-notification-system-redux'
import FRC from 'formsy-react-components';
import Formsy from 'formsy-react';

const { Input} = FRC;

export default class PrimaryDistrict extends React.Component {

  constructor(props){
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
      openConfirmModal: false
    };
  }

  componentDidMount() {
    const {params,dispatch} = this.props;
    dispatch(openNode(params.districtId))
    dispatch(fetchEntitiesFromServer(params.districtId));
    if (this.props.boundaryDetails[this.props.params.districtId].boundary_type === 2) {
      dispatch(selectPreschoolTree())
    }
  }

  saveDistrict() {
    var myform = this.myform.getModel();
    this.props.dispatch(modifyBoundary(this.districtId, myform.DistrictName));
  }

  showConfirmation = () => {
    this.setState({
      openConfirmModal: true
    })
  }

  deleteDistrict() {
    this.props.dispatch(deleteBoundary(this.districtId))
  }

  saveBlock(name) {
    const options = {
      name,
      parent: this.districtId,
      boundary_type: 1,
      boundary_category: 10
    }
    this.props.dispatch(saveNewBlock(options))
  }

  saveProject(name) {
    const options = {
      name,
      parent: this.districtId,
      boundary_type: 2,
      boundary_category: 14
    }
    this.props.dispatch(saveNewProject(options))
  }

  toggleBlockModal() {
    this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createBlock'
    })
  }

  toggleProjectModal() {
    this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createProject'
    })
  }

  closeConfirmModal = () => {
    this.setState({
      openConfirmModal: false
    })
  }


  enableSubmitButton=()=> {
    this.setState({
      canSubmit: true,
    });
  }

  disableSubmitButton=()=> {
    this.setState({
      canSubmit: false,
    });
  }

   hasChildren() {
    if(this.props.boundariesByParentId[this.props.params.districtId]) {
      return this.props.boundariesByParentId[this.props.params.districtId].length > 0;
    }
    else
      return false;
}

DistrictSummary=(props)=>{
  var boundary = this.props.boundaryDetails[this.props.params.districtId];

  if(!boundary)
    return null;
  var boundaryType = boundary.boundary_type;
  var DistrictSummary;
  this.state.value = boundary.name;
  let hasBlocks = this.hasChildren();
  if(sessionStorage.getItem('isAdmin')) {
    return(
        <div>
          {hasBlocks?<p className="col-md-12 bg-info"><h5><i className="fa fa-2x fa-info-circle" aria-hidden="true"></i>You cannot <small>delete this boundary until its children are deleted</small></h5></p>:<div></div>}

          <div className="heading-border-left brand-blue">
            <h4 className="brand-blue brand-bg-blue col-md-10">Modify Details</h4>
            {boundaryType == 2 ? <Button title='Add Project' onClick={this.toggleProjectModal} /> : <Button title='Add Block' onClick={this.toggleBlockModal} />}
          </div>

           <Formsy.Form
            onValidSubmit={this.saveDistrict}
            onValid={this.enableSubmitButton}
            onInvalid={this.disableSubmitButton}
            ref={(ref) => this.myform = ref}
            >
            <Input name="DistrictName" id="DistrictName" value={boundary.name} label="District Name:" type="text"
              placeholder="Please enter the district name"
              className="form-control"
              required validations="minLength:1"/>
          </Formsy.Form>
              <div className="col-md-8">
                <button type="button" disabled={!this.state.canSubmit} className="btn btn-primary padded-btn" onClick={this.saveDistrict}>Save</button>
                <button type="submit" className="btn btn-primary padded-btn" onClick={() => {this.showConfirmation() }} disabled={hasBlocks}>Delete</button>
                <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteDistrict} onCloseModal={this.closeConfirmModal} entity={boundary.name}/>
              </div>
        </div>
    )
  }else{
      return(
        <div>
        <h4 className="heading-err heading-border-left brand-red">  <span className="fa-stack fa-lg"> <i className="fa fa-circle fa-stack-2x brand-red"></i>
            <i className="fa fa-lock fa-stack-1x fa-inverse"></i></span>  Insufficient Permissions</h4>
        <p>You need administrator privileges to modify Boundary details.</p>
        <h4 className="brand-blue heading-border-left"> District Details</h4>
        <p> Name: {boundary.name}</p>
      </div>
    )
  }
}
  render() {
    var boundary = this.props.boundaryDetails[this.props.params.districtId];
    if(!boundary)
      return null;
    var boundaryType = boundary.boundary_type;
    var DistrictSummary;
    this.state.value = boundary.name;

    return(
      <div>
        <ol className="breadcrumb">
          <li className="active">{boundary.name}</li>
        </ol>
        {this.DistrictSummary()}
        <CreateBoundary placeHolder='Block Name' title='Create New Block' isOpen={this.props.modal.createBlock} onCloseModal={this.toggleBlockModal} save={ this.saveBlock } />
        <CreateBoundary placeHolder='Project Name' title='Create New Project' isOpen={this.props.modal.createProject} onCloseModal={this.toggleProjectModal} save={ this.saveProject } />
      </div>
    );
  }
}
