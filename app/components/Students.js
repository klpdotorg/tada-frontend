import React, {Component} from 'react';
import {modifyBoundary, deleteBoundary, newSchool, saveStudent, getStudents, getBoundaries, getInstitutions, getStudentGroups, selectPreschoolTree, removeBoundary } from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import {toggleSet} from '../utils'
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import ModifyStudent from './Modals/ModifyStudent'
import { Link } from 'react-router'
import { mapStudentsAPI, deleteStudentAPI } from '../actions/utils'
import Notifications from 'react-notification-system-redux';
import {studentStudentGroupMap, syncError} from '../actions/notifications'

const StudentRow = (props) => {
  // const father = props.relation ?  ||
  // const mother = props.relation[1]
  return (
    <div className="row">
      <div className="col-md-1"><input checked={props.selectedStudents.has(props.id)} onChange={props.selectStudent} type="checkbox" /></div>
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
  )
}

class StudentScreen extends Component {

  constructor(props){
    super(props);
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.deleteStudentConfirm = this.deleteStudentConfirm.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.openModifyStudent = this.openModifyStudent.bind(this);
    this.closeModifyStudent  =this.closeModifyStudent.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.selectStudent = this.selectStudent.bind(this);
    this.mapToCentre = this.mapToCentre.bind(this);
    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false,
      modifyStudentIsOpen: false,
      currentStudent: '',
      modifyStudentData: null,
      selectedStudents: new Set(),
      mapToCentre: props.boundariesByParentId[props.params.institutionId][0]
    };
  }

  closeConfirmation = () => {
    this.setState({
      openConfirmModal: false
    })
  }

  mapToCentre() {

    const studentsPromise = [...this.state.selectedStudents].map((val) => {
      const studentRequestBody = {
        student: val,
        student_group: this.state.mapToCentre
      }
      return mapStudentsAPI(studentRequestBody)
    })

    Promise.all(studentsPromise)
    .then(() => {
      this.props.dispatch(Notifications.success(studentStudentGroupMap))
    })
  }

  selectStudent(id) {
   const selectedStudents = toggleSet(this.state.selectedStudents, id)

    this.setState({
      selectedStudents
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

  deleteStudentConfirm(student) {
    this.setState({
      currentStudent: student,
      openConfirmModal: true
    })
  }

  deleteStudent() {
    deleteStudentAPI(this.state.currentStudent.id).then(() => {
      this.setState({
        openConfirmModal: false
      })
      this.props.dispatch(removeBoundary(this.state.currentStudent.id, this.props.params.groupId))
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
    const studentRows = studentList.map((studentId, i) => <StudentRow key={i} { ...boundaryDetails[studentId]} deleteStudent={this.deleteStudentConfirm} selectedStudents={this.state.selectedStudents} selectStudent={() => {this.selectStudent(studentId)}} openModifyStudent={this.openModifyStudent} />)
    const studentGroups = boundariesByParentId[params.institutionId]
      .filter((id) => id !== group.id)
      .map((id) => {
        let group = boundaryDetails[id]
        return <option key={id} value={group.id}>{group.label}</option>
    })

    var Displayelement;
    if(sessionStorage.getItem('isAdmin')) {
      Displayelement = (props) =>
      <div>
        <div className="students-grid">
          <div className="row grid-header">
            <div className="col-md-1"><span>Select</span></div>
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
        <div className="col-sm-2">
          <select className="col-sm-2" onChange={(e) => {this.setState({mapToCentre : e.target.value})}} value={this.state.mapToCentre} className="form-control" id="gender">
                  {studentGroups}
          </select>
          <button type="submit" className="btn btn-primary" onClick={this.mapToCentre}>Map to Center</button>

        </div>
        <div className="col-md-2">
          <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteStudent} onCloseModal={this.closeConfirmation} entity={this.state.currentStudent.first_name}/>
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
              <li>{group.label}</li>
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
