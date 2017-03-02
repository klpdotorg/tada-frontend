import React, {Component} from 'react';
import {modifyBoundary, deleteBoundary, newSchool, saveStudent, getStudents, getBoundaries, getInstitutions, getStudentGroups, selectPreschoolTree} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import ModifyStudent from './Modals/ModifyStudent'
import ReactDataGrid from 'react-data-grid'
import { Link } from 'react-router'

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

class StudentScreen extends Component {

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

    const {boundaryDetails, boundariesByParentId} = this.props.boundaries
    const {params} = this.props
    const block = boundaryDetails[params.blockId] || boundaryDetails[params.projectId];
    const district = boundaryDetails[params.districtId];
    const cluster = boundaryDetails[params.clusterId] || boundaryDetails[params.circleId]
    const institution = boundaryDetails[params.institutionId]
    const group = boundaryDetails[params.groupId]
    const studentList = boundariesByParentId[params.groupId]
    const studentRows = studentList.map((studentId, i) => <StudentRow key={i} { ...boundaryDetails[studentId]} deleteStudent={this.deleteStudent} openModifyStudent={this.openModifyStudent} />)

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

      return (
            <div>
              <ol className="breadcrumb">
              <li><Link to={district.path}>{district.name}</Link></li>
              <li><Link to={block.path}>{block.name}</Link></li>
              <li><Link to={cluster.path}>{cluster.name}</Link></li>
              <li><Link to={institution.path}>{institution.name}</Link></li>
              </ol>
              <Displayelement {...this.props}/>
            </div>
            
          )
    
  }
};

export default class Students extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true
    };
  }

  getStudentPromise(institutionId, groupId) {
    var promise = new Promise(function(resolve, reject) {
      getStudents(institutionId, groupId).then((students) => {
        resolve({
          students,
          groupId
        })
      }).catch((e) => {
        reject(e)
      })
    })

    return promise
  }

  componentDidMount() {
    const {params, dispatch} = this.props

    //Choose Preschool Hierarchy
    if (params.circleId) {
      this.props.dispatch(selectPreschoolTree())
    }

    const blockId = params.blockId || params.projectId
    const clusterId = params.clusterId || params.circleId

    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(1)
    }).then(() => 
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(params.districtId)
    })).then(() => 
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(blockId)
    })).then(() => 
    dispatch({
      type: 'BOUNDARIES',
      payload: getInstitutions(clusterId)
    })).then(() =>
    dispatch({
      type: 'BOUNDARIES',
      payload: getStudentGroups(params.institutionId)
    })).then(() =>
    dispatch({
      type: 'STUDENTS',
      payload: this.getStudentPromise(params.institutionId, params.groupId)
    })).then(() => {
    this.setState({
      isLoading:false
    })})
    
  }

  render() {
    return (
            this.state.isLoading ? 
            <div>Loading...</div> : 
            <StudentScreen {...this.props} />
          )
  }

}