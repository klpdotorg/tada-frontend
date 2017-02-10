import React, {Component} from 'react';
import { push } from 'react-router-redux';
import {saveClass, deleteStudentGroup, saveNewStudents} from '../actions';
import CreateInstitution from './Modals/CreateInstitution';
import Button from './Button'
import ConfirmModal from './Modals/Confirm'
import BulkAddStudent from './BulkAddStudent';

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
    };

  }

  // {
  //     "first_name": "SHREYAS",
  //     "middle_name": "",
  //     "last_name": "R",
  //     "uid": "",
  //     "dob": "2012-01-23",
  //     "gender": "male",
  //     "mt": 3,
  //     "active": 2,
  //     "relations": [
  //       {
  //         "relation_type": "Mother",
  //         "first_name": "SHASHIKALA",
  //         "middle_name": "",
  //         "last_name": ""
  //       },
  //       {
  //         "relation_type": "Father",
  //         "first_name": "RAMESH",
  //         "middle_name": "",
  //         "last_name": ""
  //       }
  //     ]
  //   },

  addStudents(values) {
    let options = {}
    let students = Object.values(values)
    students = students.map((student) => {
      student.relations = [
        {
          "relation_type": "Mother",
          "first_name": student.motherName,
          "middle_name": "",
          "last_name": ""
        },
        {
          "relation_type": "Father",
          "first_name": student.fatherName,
          "middle_name": "",
          "last_name": ""
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

    const {params, boundaryDetails} = this.props
    this.state = {
      schoolModalIsOpen: false,
      openConfirmModal: false,
      showBulkAdd: false,
      class: boundaryDetails[params.groupId]
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
    const {boundaryDetails, params} = this.props
    const block = boundaryDetails[params.blockId] || boundaryDetails[params.projectId];
    const district = boundaryDetails[params.districtId];
    const cluster = boundaryDetails[params.clusterId] || boundaryDetails[params.circleId]
    const institution = boundaryDetails[params.institutionId]
    const group = boundaryDetails[params.groupId]
    var Displayelement;
    return(
      <div>
       <ol className="breadcrumb">
          <li><a href={district.path}>{district.name}</a></li>
          <li><a href={block.path}>{block.name}</a></li>
          <li><a href={cluster.path}>{cluster.name}</a></li>
          <li><a href={institution.path}>{institution.name}</a></li>
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
              <label className="control-label col-sm-2" htmlFor="type">Type</label>
              <div className="col-sm-2">
                <input type="text" onChange={(e) => {this.setClass(e.target.value, 'group_type')}} className="form-control" id="type" value={this.state.class.group_type}/>
              </div>
            </div>
           </form>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary" onClick={this.saveClass}>Save</button>
            <button type="submit" className="btn btn-primary" onClick={this.showConfirmation}>Delete</button>
            <ConfirmModal isOpen={this.state.openConfirmModal} onAgree={this.deleteClass} closeModal={this.closeConfirmation} entity={group.name}/>
          </div>
        </div>
        {/*<CreateInstitution placeHolder='School Name' title='Create New School' isOpen={this.state.schoolModalIsOpen} onCloseModal={this.toggleSchoolModal} closeModal={ this.toggleSchoolModal} save={ this.saveSchool } /> */}
      </div>
    );
  }
};

