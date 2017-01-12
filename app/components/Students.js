import React from 'react';
import {modifyBoundary, deleteBoundary, newSchool} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import ReactDataGrid from 'react-data-grid'



export default class Students extends React.Component {

  constructor(props){
    super(props);
    this.openSchoolModal = this.openSchoolModal.bind(this);
    this.saveSchool = this.saveSchool.bind(this)
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.saveCluster = this.saveCluster.bind(this);    
    this.deleteCluster = this.deleteCluster.bind(this);
    this.state = {      
      schoolModalIsOpen: false,
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


  toggleSchoolModal() {
    this.setState({
      schoolModalIsOpen: false
    })
  }

  saveSchool(name) {
    // const options = {
    //   name: name,
    //   boundary: this.props.params.clusterId
    // }
    console.log('Save', options)
  }

  openSchoolModal(){
    this.setState({
      schoolModalIsOpen: true
    })
  }

  saveCluster() {
    this.props.dispatch(modifyBoundary(this.props.params.clusterId, this.clusterName.value));
  }

  deleteCluster() {
    let {params} = this.props
    this.props.dispatch(deleteBoundary(params.clusterId, params.blockId));
  }
  
  render() {

//function to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};

//Columns definition
var columns = [
{
  key: 'first_name',
  name: 'First Name',
  editable : true
},
{
  key: 'middle_name',
  name: 'Middle Name',
  editable : true
},
{
  key: 'last_name',
  name: 'Last Name',
  editable : true
},
{
  key: 'uid',
  name: 'UID',
  editable : true
},
{
  key: 'gender',
  name: 'Gender',
  editable : true
},
{
  key: 'language',
  name: 'Language',
  editable : true
},
{
  key: 'dob',
  name: 'DOB',
  editable : true
},
{
  key: 'father_name',
  name: 'Father Name',
  editable : true
},
{
  key: 'mother_name',
  name: 'Mother Name',
  editable : true
}
]


var Example = React.createClass({

  getInitialState : function(){
    const students = this.props.boundariesByParentId[params.groupId]
    const rows = students.map((id) => {
      return {
        ...this.props.boundaryDetails[id],
        mother_name: this.props.boundaryDetails[id].relations[0].first_name,
        father_name: this.props.boundaryDetails[id].relations[1].first_name

      }     

    })    
    return {rows : rows}
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx]
  },

  handleRowUpdated : function(e){
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  },

  render:function(){
    return(
      <ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.rowGetter}
      rowsCount={this.state.rows.length}      
      onRowUpdated={this.handleRowUpdated} />
      )
  }

});

const {boundaryDetails, params} = this.props
const block = boundaryDetails[params.blockId] || boundaryDetails[params.projectId];    
const district = boundaryDetails[params.districtId];    
const cluster = boundaryDetails[params.clusterId] || boundaryDetails[params.circleId]
const institution = boundaryDetails[params.institutionId]
const group = boundaryDetails[params.groupId]
const student = boundaryDetails[params.studentId]
console.log('student', this.props.boundariesByParentId[params.groupId])
var Displayelement;
if(sessionStorage.getItem('isAdmin')) {
  Displayelement = (props) => 
  <div>
  <div className='heading-border-left'>
  <h4 className="brand-blue col-md-10">Modify Details</h4>
  <Button onClick={this.openSchoolModal} title='Add Student'/>
  </div>
  <Example {...this.props} />


          {/*<form className="form-horizontal boundary-form" role="form">
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="name">First Name</label>
              <div className="col-sm-2">          
                <input type="text" ref={(ref) => this.firstName = ref} className="form-control" id="name" defaultValue={student.first_name}/>
              </div>
            </div>
           </form>
           <form className="form-horizontal boundary-form" role="form">
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="name">Middle Name</label>
              <div className="col-sm-2">          
                <input type="text" ref={(ref) => this.firstName = ref} className="form-control" id="name" defaultValue={student.middle_name}/>
              </div>
            </div>
           </form>
           <form className="form-horizontal boundary-form" role="form">
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="name">Last Name</label>
              <div className="col-sm-2">          
                <input type="text" ref={(ref) => this.lastName = ref} className="form-control" id="name" defaultValue={student.last_name}/>
              </div>
            </div>
          </form>*/}
          <div className="col-md-2">
          <button type="submit" className="btn btn-primary" onClick={this.saveCluster}>Save</button>
          <button type="submit" className="btn btn-primary" onClick={this.showConfirmation}>Delete</button>
          <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteCluster} closeModal={this.closeConfirmation} entity={cluster.name}/>
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
          <li><a href={district.path}>{district.name}</a></li>
          <li><a href={block.path}>{block.name}</a></li>
          <li><a href={cluster.path}>{cluster.name}</a></li>
          <li><a href={institution.path}>{institution.name}</a></li>          
          </ol>
          <Displayelement {...this.props}/>
          <CreateInstitution placeHolder='School Name' title='Create New School' isOpen={this.state.schoolModalIsOpen} onCloseModal={this.toggleSchoolModal} closeModal={ this.toggleSchoolModal} save={ this.saveSchool } />
          </div>
          );   
      }
    };

