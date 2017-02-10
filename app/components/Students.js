import React from 'react';
import {modifyBoundary, deleteBoundary, newSchool} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import ModifyStudent from './Modals/ModifyStudent'
import ReactDataGrid from 'react-data-grid'

//{"id":493431,"first_name":"priyanka","middle_name":"y","last_name":"hadimani","uid":null,"dob":"2000-09-10","gender":"female","mt":1,"active":2,"relations":[]

const StudentRow = (props) => {
  console.log('student', props)
  // const father = props.relation ?  ||
  // const mother = props.relation[1]
  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-2"><span>{props.first_name}</span></div>
        <div className="col-md-1"><span>{props.middle_name}</span></div>
        <div className="col-md-1"><span>{props.last_name}</span></div>
        <div className="col-md-1"><span>{props.uid}</span></div>
        <div className="col-md-1"><span>{props.gender}</span></div>
        <div className="col-md-1"><span>{props.language}</span></div>
        <div className="col-md-1"><span>{props.dob}</span></div>
        <div className="col-md-1"><span>-</span></div>
        <div className="col-md-1"><span>-</span></div>
        <div className="col-md-1"><span className="glyphicon glyphicon-trash">Delete</span></div>
        <div className="col-md-1"><span className="glyphicon glyphicon-pencil" onClick={() => { props.openModifyStudent({...props}) }}>Edit</span></div>
      </div>
    </div>
  )
}

export default class Students extends React.Component {

  constructor(props){
    super(props);
    this.saveSchool = this.saveSchool.bind(this)
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.saveCluster = this.saveCluster.bind(this);
    this.deleteCluster = this.deleteCluster.bind(this);
    this.openModifyStudent = this.openModifyStudent.bind(this);
    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false,
      modifyStudentIsOpen: false,
      modifyStudentData: null
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
    ('Save', options)
  }

  openModifyStudent(data){
    this.setState({
      modifyStudentIsOpen: true,
      modifyStudentData: data
    })
  }

  closeModifyStudent() {
    this.setState({
      modifyStudentIsOpen: false
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

    const {boundaryDetails, params, boundariesByParentId} = this.props
    const block = boundaryDetails[params.blockId] || boundaryDetails[params.projectId];
    const district = boundaryDetails[params.districtId];
    const cluster = boundaryDetails[params.clusterId] || boundaryDetails[params.circleId]
    const institution = boundaryDetails[params.institutionId]
    const group = this.props.boundaryDetails[params.groupId]
    const students = boundariesByParentId[params.groupId]

    const studentRows = students.map((studentId, i) => <StudentRow key={i} { ...boundaryDetails[studentId]} openModifyStudent={this.openModifyStudent} />)

    var Displayelement;
    if(sessionStorage.getItem('isAdmin')) {
      Displayelement = (props) =>
      <div>
        <div className='heading-border-left'>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-2"><span>First Name</span></div>
              <div className="col-md-1"><span>Middle Name</span></div>
              <div className="col-md-1"><span>Last Name</span></div>
              <div className="col-md-1"><span>UID</span></div>
              <div className="col-md-1"><span>Gender</span></div>
              <div className="col-md-1"><span>Language</span></div>
              <div className="col-md-1"><span>DoB</span></div>
              <div className="col-md-1"><span>Father Name</span></div>
              <div className="col-md-1"><span>Mother Name</span></div>
              <div className="col-md-1"><span>Delete</span></div>
              <div className="col-md-1"><span>Edit</span></div>
            </div>
            { studentRows }
         </div>

        </div>
        <div className="col-md-2">
          <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteCluster} closeModal={this.closeConfirmation} entity={cluster.name}/>
          <ModifyStudent isOpen={this.state.modifyStudentIsOpen} data={this.state.modifyStudentData} closeModal={this.closeConfirmation} entity={cluster.name}/>
        </div>
      </div>
    } else {
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

