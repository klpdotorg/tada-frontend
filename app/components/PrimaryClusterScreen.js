import React from 'react';
import {modifyBoundary, deleteBoundary, newSchool} from '../actions';
import CreateInstitution from './Modals/CreateBoundary';
import Button from './Button'


export default class PrimaryCluster extends React.Component {

  constructor(props){
    super(props);
    this.openSchoolModal = this.openSchoolModal.bind(this);
    this.saveSchool = this.saveSchool.bind(this)
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.onClickSaveCluster = this.onClickSaveCluster.bind(this);    
    this.onClickDeleteCluster = this.onClickDeleteCluster.bind(this);
    this.state = {      
      schoolModalIsOpen: false
    };
  }

  toggleSchoolModal() {
    this.setState({
      schoolModalIsOpen: false
    })
  }

  saveSchool(name) {
    const options = {
      name: name,
      boundary: this.props.params.clusterId
    }
    console.log('Save', options)
  }

  openSchoolModal(){
    this.setState({
      schoolModalIsOpen: true
    })
  }

  onClickSaveCluster(districtid) {
    console.log(this.props)
    console.log(this.clusterName.value);
    this.props.dispatch(modifyBoundary(districtid, this.clusterName.value));
  }

  onClickDeleteCluster(districtid) {
    this.props.dispatch(deleteBoundary(districtid));
  }
  
  render() {
  	var block = this.props.boundaryDetails[this.props.params.blockId];
  	var blockPath = "#" + block.path;
  	var district = this.props.boundaryDetails[this.props.params.districtId];
  	var districtPath = "#" + district.path;
  	var cluster = this.props.boundaryDetails[this.props.params.clusterId];
  	var clusterPath = "#" + cluster.path;
    var Displayelement;
    if(sessionStorage.getItem('isAdmin')) {
      Displayelement = (props) => 
        <div>
          <div className='heading-border-left'>
            <h4 className="brand-blue col-md-10">Modify Details</h4>
            <Button onClick={this.openSchoolModal} title='Add School'/>
          </div>          
          <form className="form-horizontal boundary-form" role="form">
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="name">Cluster :</label>
              <div className="col-sm-2">          
                <input type="text" ref={(ref) => this.clusterName = ref} className="form-control" id="name" defaultValue={cluster.name}/>
              </div>
            </div>
           </form>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary" onClick={() => {this.onClickSaveCluster(cluster.id) }}>Save</button>
            <button type="submit" className="btn btn-primary" onClick={() => {this.onClickDeleteCluster(cluster.id)}}>Delete</button>
          </div>             
        </div>
    }
    else {
      Displayelement = (props) => 
        <div>
          <h4 className="heading-err heading-border-left brand-red"> <i className="fa fa-lock brand-red" aria-hidden="true"></i>  Insufficient Permissions</h4>
          <p>You need administrator privileges to modify Boundary details.</p>
          <h4 className="brand-blue heading-border-left"> Cluster Details</h4>
          <p> Name: {cluster.name}</p>
        </div>
    }
     return(
      <div>
       <ol className="breadcrumb">
          <li><a href={districtPath}>{district.name}</a></li>
          <li><a href={blockPath}>{block.name}</a></li>
          <li className="active">{cluster.name}</li>
        </ol>
        <Displayelement {...this.props}/>
        <CreateInstitution placeHolder='School Name' title='Create New School' isOpen={this.state.schoolModalIsOpen} onCloseModal={this.toggleSchoolModal} closeModal={ this.toggleSchoolModal} save={ this.saveSchool } />
      </div>
    );   
  }
};

