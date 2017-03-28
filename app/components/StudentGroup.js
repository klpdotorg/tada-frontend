import React, {Component} from 'react';
import { push } from 'react-router-redux';
import {saveClass, deleteStudentGroup, saveNewStudents, getBoundaries, getInstitutions, getStudentGroups, selectPreschoolTree} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import BulkAddStudent from './BulkAddStudent';
import { Link } from 'react-router'

export default class StudentGroupScreen extends Component {
  constructor(props) {
    super(props)
    this.showBulkAdd = this.showBulkAdd.bind(this)
    this.hideBulkAdd = this.hideBulkAdd.bind(this)
    this.addStudents = this.addStudents.bind(this)
    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false,
      showBulkAdd: false,
      isLoading: true
    };

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
    })).then(() => {
    this.setState({
      isLoading:false
    })})
  }

  componentWillReceiveProps() {
    this.setState({
      showBulkAdd:false
    })
  }

  addStudents(values) {
    let options = {}
    let students = Object.values(values)
    students = students.map((student) => {
      student.relations = [
        {
          "relation_type": "Mother",
          "first_name": student.motherFirstName,
          "middle_name": student.motherMiddleName,
          "last_name": student.motherLastName
        },
        {
          "relation_type": "Father",
          "first_name": student.fatherFirstName,
          "middle_name": student.fatherMiddleName,
          "last_name": student.fatherLastName
        }
      ]

      return student
    })

    options.institution = this.props.params.institutionId
    options.class = this.props.params.groupId

    options.students = students

    this.props.dispatch(saveNewStudents(options))
  }

  showBulkAdd() {
    this.setState({
      showBulkAdd: true
    })
  }

  hideBulkAdd() {
    this.setState({
      showBulkAdd: false
    })
  }


  render () {
    return (
      this.state.isLoading ?
      <div>Loading...</div> :
      <div>
        {this.state.showBulkAdd ? <BulkAddStudent addStudents={this.addStudents} hide={this.hideBulkAdd}/> : <StudentGroup showBulkAdd={this.showBulkAdd} {...this.props} />}
      </div>
    )
  }
}

class StudentGroup extends Component {

  constructor(props){
    super(props);
    this.openSchoolModal = this.openSchoolModal.bind(this);
    this.toggleSchoolModal = this.toggleSchoolModal.bind(this);
    this.saveClass = this.saveClass.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.hideBulkAdd = this.hideBulkAdd.bind(this);
    this.addStudents = this.addStudents.bind(this);

    const {params, boundaries} = this.props
    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false,
      showBulkAdd: false,
      class: boundaries.boundaryDetails[params.groupId]
    };
  }

  setClass(val, key) {
    let values = this.state.class
    values[key] = val
    this.setState({
      class: values
    })
  }

  closeConfirmation = () => {
    this.setState({
      openConfirmModal: false
    })
  }

  componentWillReceiveProps (nextProps) {
    const {boundaries, params} = nextProps
    this.setState({
      class: boundaries.boundaryDetails[params.groupId]
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

  hideBulkAdd() {
    this.setState({
      showBulkAdd: false
    })
  }

  openSchoolModal(){
    this.setState({
      schoolModalIsOpen: true
    })
  }

  addStudents(values) {
    const students = Object.values(values)

  }

  saveClass() {
    this.props.dispatch(saveClass(this.state.class));
  }

  deleteClass() {
    this.props.dispatch(deleteStudentGroup(this.state.class));
  }

  viewStudent = (path) => {
    this.props.dispatch(push(`${path}/students`))
  }

  render() {
    const {boundaries, params} = this.props
    const block = boundaries.boundaryDetails[params.blockId] || boundaries.boundaryDetails[params.projectId];
    const district = boundaries.boundaryDetails[params.districtId];
    const cluster = boundaries.boundaryDetails[params.clusterId] || boundaries.boundaryDetails[params.circleId]
    const institution = boundaries.boundaryDetails[params.institutionId]
    const group = boundaries.boundaryDetails[params.groupId]
    var Displayelement;
    return(
      <div>
       <ol className="breadcrumb">
          <li><Link to={district.path}>{district.name}</Link></li>
          <li><Link to={block.path}>{block.name}</Link></li>
          <li><Link to={cluster.path}>{cluster.name}</Link></li>
          <li><Link to={institution.path}>{institution.name}</Link></li>
        </ol>
        <div>
          <div className='heading-border-left'>
            <h4 className="brand-blue col-md-10">Modify Details</h4>
            <Button onClick={this.props.showBulkAdd} title='Add Students'/>
            <button className='btn btn-default view-student-btn' onClick={this.viewStudent.bind(null, group.path)}>View Students</button>
          </div>
          <form className="form-horizontal boundary-form" role="form">
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="class">Class</label>
              <div className="col-sm-2">
                <input type="text" onChange={(e) => {this.setClass(e.target.value, 'name')}} className="form-control" id="class" value={this.state.class.name}/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="section">Section</label>
              <div className="col-sm-2">
                <input type="text" onChange={(e) => {this.setClass(e.target.value, 'section')}}  className="form-control" id="section" value={this.state.class.section}/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="section">Type</label>
              <div className='col-sm-2'>
                <select className="col-sm-2" onChange={(e) => {this.setClass(e.target.value, 'group_type')}} value={this.state.class.group_type} className="form-control" id="gender">
                  <option value='Class'>Class</option>
                  <option value='Center'>Center</option>
                </select>
              </div>
            </div>
           </form>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary" onClick={this.saveClass}>Save</button>
            <button type="submit" className="btn btn-primary" onClick={this.showConfirmation}>Delete</button>
            <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteClass} onCloseModal={this.closeConfirmation} entity={group.name}/>
          </div>
        </div>
      </div>
    );
  }
};

