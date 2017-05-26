import React, {Component} from 'react';
import {modifyBoundary, deleteBoundary, newSchool, saveStudent, getStudents, getBoundaries, getInstitutions, getStudentGroups, selectPreschoolTree, removeBoundary ,openNode,fetchEntitiesFromServer} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import {toggleSet} from '../utils'
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import ModifyStudent from './Modals/ModifyStudent'
import { Link } from 'react-router'
import { mapStudentsAPI, deleteStudentAPI, patchStudentAPI } from '../actions/utils'
import { displayFullName } from './utils'
import Notifications from 'react-notification-system-redux';
import {studentStudentGroupMap, syncError} from '../actions/notifications'
import {groupBy} from 'lodash'

const StudentRow = (props) => {
  const relations = groupBy(props.relations, 'relation_type');
  return (
    <tr>
      <td><input checked={props.selectedStudents.has(props.id)} onChange={props.selectStudent} type="checkbox" /></td>
      <td>{props.id}</td>
      <td>{displayFullName(props)}</td>
      <td>{props.uid}</td>
      <td>{props.gender}</td>
      <td>{props.language}</td>
      <td>{props.dob}</td>
      <td>{displayFullName(relations.Father[0])}</td>
      <td>{displayFullName(relations.Mother[0])}</td>
      <td>
        <button onClick={() => { props.deleteStudent({...props}) }} className="btn btn-primary"><span className="fa fa-trash-o"></span></button>
        <button onClick={() => { props.openModifyStudent({...props}) }} className="btn btn-primary padded-btn"><span className="fa fa-pencil-square-o"></span></button>
      </td>
    </tr>
  )
}

const NoStudentMsg = () => {

  return (
    <div className="row text-center">
      <div className="col-md-3"></div>
      {"No Student is present"}
    </div>
  )
}


class StudentScreen extends Component {

  constructor(props){
    super(props);
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
    let relations = []
    relations.push(student.Father, student.Mother)
    student.relations = relations
    console.log(student);
    this.props.dispatch({
      type: 'STUDENTS',
      payload: patchStudentAPI(student, this.props.params.groupId)
    }).then(() => {
      this.closeModifyStudent()
      this.props.dispatch(Notifications.success(studentStudentGroupMap))
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
    const checkStudents = studentList.length>0? studentRows:<NoStudentMsg/>
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
      <table className="table table-condensed">
        <thead>
          <tr className="text-primary text-uppercase">
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>UID</th>
            <th>Gender</th>
            <th>Mother Tongue</th>
            <th>Date of Birth</th>
            <th>Father''s Name</th>
            <th>Mother''s Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {checkStudents}
        </tbody>
      </table>
      <div className="row">
        <div className="col-md-2">
          <select onChange={(e) => {this.setState({mapToCentre : e.target.value})}} value={this.state.mapToCentre} className="form-control" id="gender">
            {studentGroups}
          </select>
        <div className="col-md-8">
          <button type="submit" className="btn btn-primary" onClick={this.mapToCentre}>Map to Center</button>
        </div>
      </div>
    </div>
    } else {
        Displayelement = (props) =>
        <div className="alert alert-danger">
          <i className="fa fa-lock fa-lg" aria-hidden="true"></i> 
          Insufficient Privileges. Please contact administrator.
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
    dispatch(openNode(params.districtId))
    dispatch(fetchEntitiesFromServer(params.districtId));
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(1)
    }).then(() =>{
      dispatch({
        type: 'BOUNDARIES',
        payload: getBoundaries(params.districtId)
      }).then(() =>{
        dispatch(openNode(blockId))
        dispatch(fetchEntitiesFromServer(blockId));
        dispatch({
          type: 'BOUNDARIES',
          payload: getBoundaries(blockId)
        }).then(() =>{
          dispatch(openNode(clusterId))
          dispatch(fetchEntitiesFromServer(clusterId));
          dispatch({
            type: 'BOUNDARIES',
            payload: getInstitutions(clusterId)
          }).then(() =>{
            dispatch(openNode(params.institutionId))
            dispatch(fetchEntitiesFromServer(params.institutionId));
            dispatch({
              type: 'BOUNDARIES',
              payload: getStudentGroups(params.institutionId)
            }).then(() =>{
                dispatch({
                  type: 'STUDENTS',
                  payload: this.getStudentPromise(params.institutionId, params.groupId)
                }).then(() => {
                this.setState({
                  isLoading:false
              })
              dispatch(openNode(params.groupId))
              // dispatch(fetchEntitiesFromServer(params.groupId));
            })
            })
          })
        })
      })
    })

  }

  render() {
    return (
            this.state.isLoading ?
            <div>Loading...</div> :
            <StudentScreen {...this.props} />
          )
  }

}
