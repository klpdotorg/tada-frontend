const faker = require('faker');
const ReactDataGrid = require('react-data-grid');
// const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;
import { fetchStudentsByGroupId, fetchQuestionsForAssessment } from '../actions';
import _ from 'lodash';
faker.locale = 'en_GB';

const val = [0, 1];
export default class AssessmentEntry extends React.Component {
  // const Example = React.createClass({
  deleteStudent = () => {
    console.log('deleteStudent called');
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.selectedProgramAssess, this.props.selectedProgramAssess)) {
      this.props.dispatch(fetchStudentsByGroupId(nextProps.selectedProgramAssess.studentgroupId));
    }
    if (
      this.props.selectedProgramAssess.assessmentId != nextProps.selectedProgramAssess.assessmentId
    ) {
      console.log('Next props assess id is: ', nextProps.selectedProgramAssess.assessmentId);
      //Issue a call to go get questions for the assessment and then count the result.
      this.props
        .dispatch(
          fetchQuestionsForAssessment(
            nextProps.selectedProgramAssess.programId,
            nextProps.selectedProgramAssess.assessmentId,
          ),
        )
        .then(data => {
          console.log('Fetched questions ', data);
        });
    }
  }

  render() {
    let students = this.props.boundariesByParentId[this.props.selectedProgramAssess.studentgroupId];
    let studentsList;
    let questions = this.props.questionsByAssessId[this.props.selectedProgramAssess.assessmentId];
    let html = '';
    if (questions && questions.length > 0) {
      html = questions.map((id, index) => {
        return <td><span>{index + 1}</span></td>;
      });
    }
    if (students && students.length > 0) {
      studentsList = students.map(id => {
        let studentDetails = this.props.boundaryDetails[id];
        let result = '';
        if (studentDetails) {
          result = <InputRow student={studentDetails} questions={questions} />;
        }
        return result;
      });
    }

    /*return (
      <div>
        <div className="row">
          <h4> Assessment Entry </h4>
        </div>
        <div className="students-grid">
          <div className="row header">
            <div className="col-md-2"><span>UID</span></div>
            <div className="col-md-2"><span>Name</span></div>
            {html}
            <div className="col-md-1"><span>Actions</span></div>
          </div>

          {studentsList}
        </div>
      </div>
    );*/

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr className="bg-info">
              <td>UID</td>
              <td colSpan="2">Name</td>
              {html}
            </tr>
          </thead>
          <tbody>
            {this.props.isFetching
              ? <tr colSpan="3">
                  <td colSpan="3" style={{ 'text-align': 'center' }}>
                    <i className="fa fa-cog fa-spin fa-3x fa-fw" />Loading...
                  </td>
                </tr>
              : studentsList}
          </tbody>
        </table>
      </div>
    );
  }
}

class InputRow extends React.Component {
  render() {
    let name = '';
    let id;
    if (this.props.student) {
      name = this.props.student.first_name + ' ' + this.props.student.last_name;
      id = this.props.student.id;
    }
    let html = '';
    if (this.props.questions && this.props.questions.length > 0) {
      html = this.props.questions.map((id, index) => {
        return <td><input type="text" className="form-control" /></td>;
      });
    }
    /*return (
      <div className="row">
        <div className="col-md-2"><span>{id}</span></div>
        <div className="col-md-2 "><span>{name}</span></div>
        {html}
        <div className="col-md-1">
          <span onClick={this.saveEntry} className="glyphicon glyphicon-trash">Save</span>
          <span
            className="glyphicon glyphicon-pencil"
            onClick={() => {
              console.log('Edit Button Clicked');
            }}
          >
            Edit
          </span>
        </div>
      </div>
    );*/
    return (
      <tr>
        <td>{id}</td>
        <td colSpan="2"> {name}</td>
        {html}
      </tr>
    );
  }
}

// });

// export default Example;
