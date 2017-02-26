import React from 'react';
import {modifyBoundary, deleteBoundary, newSchool, saveStudent} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import ModifyStudent from './Modals/ModifyStudent'
import ReactDataGrid from 'react-data-grid'
import { Link } from 'react-router'

//{"id":493431,"first_name":"priyanka","middle_name":"y","last_name":"hadimani","uid":null,"dob":"2000-09-10","gender":"female","mt":1,"active":2,"relations":[]

const StudentRow = (props) => {
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
        <div className="col-md-1"><span onClick={() => { props.deleteStudent({...props}) }} className="glyphicon glyphicon-trash">Delete</span></div>
        <div className="col-md-1"><span className="glyphicon glyphicon-pencil" onClick={() => { props.openModifyStudent({...props}) }}>Edit</span></div>
      </div>
    </div>
  )
}

export default class Students extends React.Component {

  constructor(props){
    super(props);
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.openModifyStudent = this.openModifyStudent.bind(this);
    this.closeModifyStudent  =this.closeModifyStudent.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false,
      modifyStudentIsOpen: false,
      currentStudent: '',
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

  saveStudent(student){
    this.props.dispatch(saveStudent(student))
  }


  toggleSchoolModal() {
    this.setState({
      schoolModalIsOpen: false
    })
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

  deleteStudent(student) {
    this.setState({
      currentStudent: student,
      openConfirmModal: true
    })
  }

  render() {

    const {boundaryDetails, params, boundariesByParentId} = this.props
    const block = boundaryDetails[params.blockId] || boundaryDetails[params.projectId];
    const district = boundaryDetails[params.districtId];
    const cluster = boundaryDetails[params.clusterId] || boundaryDetails[params.circleId]
    const institution = boundaryDetails[params.institutionId]
    const group = this.props.boundaryDetails[params.groupId]
    const students = boundariesByParentId[params.groupId]

    const studentRows = students.map((studentId, i) => <StudentRow key={i} { ...boundaryDetails[studentId]} deleteStudent={this.deleteStudent} openModifyStudent={this.openModifyStudent} />)

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
          <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.closeConfirmation} closeModal={this.closeConfirmation} entity={this.state.currentStudent.first_name}/>
          <ModifyStudent saveStudent={this.saveStudent} isOpen={this.state.modifyStudentIsOpen} data={this.state.modifyStudentData} closeModal={this.closeModifyStudent} entity={cluster.name}/>
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
        <li><Link to={district.path}>{district.name}</Link></li>
        <li><Link to={block.path}>{block.name}</Link></li>
        <li><Link to={cluster.path}>{cluster.name}</Link></li>
        <li><Link to={institution.path}>{institution.name}</Link></li>
        </ol>
        <Displayelement {...this.props}/>
      </div>
    );
  }
};

