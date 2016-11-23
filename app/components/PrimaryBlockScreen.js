import React from 'react';
import {modifyBoundary, deleteBoundary, saveNewCluster} from '../actions';
import Button from './Button'
import CreateCluster from './Modals/CreateBoundary'
import ConfirmModal from './Modals/Confirm'



export default class PrimaryDistrict extends React.Component {

  constructor(props){
    super(props);
    this.onClickSaveBlock = this.onClickSaveBlock.bind(this);    
    this.onClickDeleteBlock = this.onClickDeleteBlock.bind(this);    
    this.toggleClusterModal = this.toggleClusterModal.bind(this);
    this.saveCluster = this.saveCluster.bind(this);
    this.state = {
      value: '',
      clusterModalIsOpen: false,
      openConfirmModal: false
    };
  }

  closeConfirmation = () => {
    this.setState({
      openConfirmModal: false
    })
  }

  showConfirmation = () => {
    this.setState({
      openConfirmModal: true
    })
  }

  onClickSaveBlock() {    
    this.props.dispatch(modifyBoundary(this.props.params.blockId, this.blockName.value));
  }

  saveCluster(name) {
    const options = {
      name,
      parent: this.props.params.blockId,
      boundary_type: 1,
      boundary_category: 11
    }
    this.props.dispatch(saveNewCluster(options))    
  }

  toggleClusterModal(){
    this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createCluster'
    })
  }  

  onClickDeleteBlock() {
		let {params} = this.props
    this.props.dispatch(deleteBoundary(params.blockId, params.districtId));
  }

  render() {
    var block = this.props.boundaryDetails[this.props.params.blockId];    
    var district = this.props.boundaryDetails[this.props.params.districtId];    
    var Displayelement;
    if(sessionStorage.getItem('isAdmin')) {
      Displayelement = (props) => 
        <div>
          <div className='heading-border-left'>
            <h4 className="brand-blue col-md-10">Modify Details</h4>
            <Button onClick={this.toggleClusterModal} title='Add Cluster'/>
          </div>
          
            <form className="form-horizontal boundary-form" role="form">
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="name">Block :</label>
                <div className="col-sm-2">          
                  <input type="text" ref={(ref) => this.blockName = ref} className="form-control" id="name" defaultValue={block.name}/>
                </div>
              </div>
              </form>

              <div className="col-md-2">
                <button type="submit" className="btn btn-primary" onClick={() => {this.onClickSaveBlock() }}>Save</button>
                <button type="submit" className="btn btn-primary" onClick={() => {this.showConfirmation()}}>Delete</button>
                <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.onClickDeleteBlock} closeModal={this.closeConfirmation} entity={block.name}/>
              </div>
        </div>
    }
    else {
      Displayelement = (props) => 
        <div>
          <h4 className="heading-err heading-border-left brand-red"> <i className="fa fa-lock brand-red" aria-hidden="true"></i>  Insufficient Permissions</h4>
          <p>You need administrator privileges to modify Boundary details.</p>
          <h4 className="brand-blue heading-border-left"> Block Details</h4>
          <p> Name: {block.name}</p>
        </div>
    }

    return(
      <div>
        <ol className="breadcrumb">
          <li><a href={district.path}>{district.name}</a></li>
          <li className="active">{block.name}</li>
        </ol>
        <Displayelement {...this.props} />
        <CreateCluster placeHolder='Cluster Name' title='Create New Cluster' isOpen={this.props.modal.createCluster} onCloseModal={this.toggleClusterModal} closeModal={ this.toggleClusterModal} save={ this.saveCluster } />
      </div>
    );   
  }
};

