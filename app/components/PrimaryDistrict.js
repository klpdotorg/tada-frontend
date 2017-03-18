import React from 'react';
import Button from './Button'
import {modifyBoundary, deleteBoundary, saveNewBlock, saveNewProject, selectPreschoolTree} from '../actions'
import CreateBoundary from './Modals/CreateBoundary'
import {Link} from 'react-router'
import ConfirmModal from './Modals/Confirm'
import Notifications from 'react-notification-system-redux'


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

    this.state = {
      value: '',
      openConfirmModal: false
    };
  }

  componentDidMount() {
    if (this.props.boundaryDetails[this.props.params.districtId].boundary_type == 2) {
      this.props.dispatch(selectPreschoolTree())
    }
  }

  saveDistrict() {
    this.props.dispatch(modifyBoundary(this.districtId, this.districtName.value));
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

  render() {    
    var boundary = this.props.boundaryDetails[this.props.params.districtId];
    if(!boundary)
      return null;
    var boundaryType = boundary.boundary_type;
    var DistrictSummary;
    this.state.value = boundary.name;
    if(sessionStorage.getItem('isAdmin')) {
      DistrictSummary = (props) => 
        <div>
          <div className="heading-border-left brand-blue">
            <h4 className="brand-blue brand-bg-blue col-md-10">Modify Details</h4>
            {boundaryType == 2 ? <Button title='Add Project' onClick={this.toggleProjectModal} /> : <Button title='Add Block' onClick={this.toggleBlockModal} />}
          </div>
            <form className="form-horizontal boundary-form" role="form">
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="name">District Name:</label>
                <div className="col-sm-2">          
                  <input type="text" ref={(ref) => this.districtName = ref} className="form-control" id="name" defaultValue={boundary.name}/>
                </div>
              </div>
              </form>

              <div className="col-md-8">
                <button type="submit" className="btn btn-primary padded-btn" onClick={() => {this.saveDistrict(this.districtId) }}>Save</button>
                <button type="submit" className="btn btn-primary padded-btn" onClick={() => {this.showConfirmation() }}>Delete</button>
                <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteDistrict} closeModal={this.closeConfirmModal} entity={boundary.name}/>
              </div>
        </div>
    }
    else {
      DistrictSummary = (props) => 
        <div>
          <h4 className="heading-err heading-border-left brand-red"> <i className="fa fa-lock brand-red" aria-hidden="true"></i>  Insufficient Permissions</h4>
          <p>You need administrator privileges to modify Boundary details.</p>
          <h4 className="brand-blue heading-border-left"> District Details</h4>
          <p> Name: {boundary.name}</p>
        </div>
    }

    return(
      <div>
        <ol className="breadcrumb">
          <li className="active">{boundary.name}</li>          
        </ol>
        <DistrictSummary />
        <CreateBoundary placeHolder='Block Name' title='Create New Block' isOpen={this.props.modal.createBlock} onCloseModal={this.toggleBlockModal} closeModal={ this.toggleBlockModal} save={ this.saveBlock } />
        <CreateBoundary placeHolder='Project Name' title='Create New Project' isOpen={this.props.modal.createProject} onCloseModal={this.toggleProjectModal} closeModal={ this.toggleProjectModal} save={ this.saveProject } />
      </div>
    );
  }
}
