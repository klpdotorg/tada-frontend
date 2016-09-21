import React from 'react';
import Button from './Button'
import {modifyBoundary, deleteBoundary, saveNewBlock} from '../actions'
import CreateBlock from './Modals/CreateBoundary'
import {Link} from 'react-router'

export default class PrimaryDistrict extends React.Component {

  constructor(props){
    super(props);    
    this.saveDistrict = this.saveDistrict.bind(this);
    this.deleteDistrict = this.deleteDistrict.bind(this);    
    this.toggleBlockModal = this.toggleBlockModal.bind(this);
    this.saveBlock = this.saveBlock.bind(this);
    this.state = {
      value: '',
      blockModalIsOpen: false
    };
  }


  saveDistrict(districtId) {
    this.props.dispatch(modifyBoundary(districtId, this.districtName.value));
  }

  deleteDistrict(districtId) {
    this.props.dispatch(deleteBoundary(districtId))
  } 

  saveBlock(name) {
    const options = {
      name,
      parent: this.props.params.districtId,
      boundary_type: 1,
      boundary_category: 10
    }
    this.props.dispatch(saveNewBlock(options))
  }

  toggleBlockModal() {    
    this.props.dispatch({
      type: 'TOGGLE_MODAL',
      modal: 'createBlock'
    })
  }

  render() {    
    var districtId = this.props.params.districtId;
    var boundary = this.props.boundaryDetails[districtId];
    var districtPath = "#" + boundary.path;
    var DistrictSummary;
    this.state.value = boundary.name;
    if(sessionStorage.getItem('isAdmin')) {
      DistrictSummary = (props) => 
        <div>
          <div className='heading-border-left'>
            <h4 className="brand-blue col-md-10">Modify Details</h4>
            <Button title='Add Block' onClick={this.toggleBlockModal} />
          </div>
            <form className="form-horizontal boundary-form" role="form">
              <div className="form-group">
                <label className="control-label col-sm-2" htmlFor="name">District Name:</label>
                <div className="col-sm-2">          
                  <input type="text" ref={(ref) => this.districtName = ref} className="form-control" id="name" defaultValue={boundary.name}/>
                </div>
              </div>
              </form>

              <div className="col-md-2">
                <button type="submit" className="btn btn-primary" onClick={() => {this.saveDistrict(districtId) }}>Save</button>
                <button type="submit" className="btn btn-primary" onClick={() => {this.deleteDistrict(districtId) }}>Delete</button>
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
        <DistrictSummary {...this.props}/>
        <CreateBlock placeHolder='Block Name' title='Create New Block' isOpen={this.props.modal.createBlock} onCloseModal={this.toggleBlockModal} closeModal={ this.toggleBlockModal} save={ this.saveBlock } />
      </div>
    );
  }
}
