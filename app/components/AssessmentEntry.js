const faker = require('faker');
const ReactDataGrid = require('react-data-grid');
// const exampleWrapper = require('../components/exampleWrapper');
const React = require('react');
const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;
import {
  fetchStudentsByGroupId,
  fetchQuestionsForAssessment,
  postAnswerForStudent,
  answersSaved,
  answersNotSaved,
  getAnswersForStudents,
} from '../actions';
import _ from 'underscore';
import lodash from 'lodash';
faker.locale = 'en_GB';
import Notifications from 'react-notification-system-redux';
import { Button, Popover, PopoverTitle, PopoverContent } from 'reactstrap';

const val = [0, 1];
export default class AssessmentEntry extends React.Component {
  // const Example = React.createClass({

  saveEntry = (studentId, answers) => {
    this.props
      .dispatch(
        postAnswerForStudent(
          this.props.selectedProgramAssess.programId,
          this.props.selectedProgramAssess.assessmentId,
          studentId,
          answers,
        ),
      )
      .then(() => {
        this.props.dispatch(Notifications.success(answersSaved(studentId)));
      })
      .catch(() => {
        this.props.dispatch(Notifications.error(answersNotSaved(studentId)));
      });
  };

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sortStudentsAlpha = this.sortStudentsAlpha.bind(this);
    this.state = {
      answers: {},
    };
    this.saveEntry = this.saveEntry.bind(this);
    $('[data-toggle="tooltip"]').tooltip();
  }

  handleInputChange(student, question, event) {
    console.log('Input change received: ', event);
    if (!this.state.answers[student]) {
      this._answers[student] = [];
    } else {
      //Check if answer for a qn already exists and then omit it, we only need to push the new answer..
      this._answers[student] = _.reject(this._answers[student], function(answer) {
        return (answer.question = question);
      });
    }
    this._answers[student].push({
      question,
      student,
      active: '2',
      answer: event.currentTarget.value,
    });
    console.log(this._answers);
  }

  deleteStudent = () => {
    console.log('deleteStudent called');
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.selectedProgramAssess, this.props.selectedProgramAssess)) {
      this.props
        .dispatch(fetchStudentsByGroupId(nextProps.selectedProgramAssess.studentgroupId))
        .then(data => {
          //fetch answers for entire class.
          this.props.dispatch(
            getAnswersForStudents(
              nextProps.selectedProgramAssess.programId,
              nextProps.selectedProgramAssess.assessmentId,
              data,
            ),
          );
        });
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

  sortStudentsAlpha(studentsArr) {
    return studentsArr.sort((a, b) => {
      const aName = lodash.capitalize(a.first_name);
      const bName = lodash.capitalize(b.first_name);
      return aName < bName ? -1 : aName > bName ? 1 : 0;
    });
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
    let studentDetailsArray = [];
    if (students && students.length > 0) {
      students.map(id => {
        if (this.props.boundaryDetails[id]) {
          studentDetailsArray.push(this.props.boundaryDetails[id]);
        }
      });
      studentDetailsArray = this.sortStudentsAlpha(studentDetailsArray);
    }
    if (studentDetailsArray && studentDetailsArray.length > 0) {
      studentsList = studentDetailsArray.map(student => {
        // let studentDetails = this.props.boundaryDetails[id];
        let result = '';
        if (studentDetailsArray) {
          result = (
            <InputRow
              student={student}
              answers={this.props.answersByStudentQnId}
              questions={questions}
              saveEntry={this.saveEntry.bind(this)}
              handleInputChange={this.handleInputChange.bind(this)}
            />
          );
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
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.computeAnswers = this.computeAnswers.bind(this);
    let initAnswers = this.computeAnswers(props.answers);
    this.state = {
      popoverOpen: false,
      answers: initAnswers,
    };
    this.handleAnswerInput = this.handleAnswerInput.bind(this);
    this.getAnswerForQn = this.getAnswerForQn.bind(this);
  }

  computeAnswers(answers) {
    let initialAnswers = {};
    if (answers) {
      Object.values(answers).map(answer => {
        if (answer.student == this.props.student.id) {
          initialAnswers[answer.question] = answer.answer_score || answer.answer_grade;
        }
      });
    }
    return initialAnswers;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.answers != nextProps.answers) {
      let newAnswers = this.computeAnswers(nextProps.answers);
      this.setState({
        answers: newAnswers,
      });
    }
  }

  handleAnswerInput(student, question, event) {
    //Check if answer for a qn already exists and then omit it, we only need to push the new answer..
    console.log('change called');
    let qnId = question.split('_')[1];
    let newAnswer = this.state.answers;
    newAnswer[qnId] = event.target.value;
    this.setState({
      answers: newAnswer,
    });
    //  let existingAnswers = this.state.answers;
    //  if(!existingAnswers)
    //     existingAnswers=[];
    //  existingAnswers = _.reject(this.state.answers, function(answer) {
    //     return (answer.question = question);
    //   });
    // existingAnswers.push({
    //   question,
    //   student,
    //   active: '2',
    //   answer: event.currentTarget.value,
    // })
    // this.setState({
    //   answers: existingAnswers,
    // });
  }

  getAnswerForQn(questionId) {
    let qnId = questionId.split('_')[1];
    let answer = this.state.answers[qnId];
    if (!answer) answer = '';
    return answer;
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  saveAnswers() {
    this.props.saveEntry(this.props.student.id, this.state.answers);
  }

  render() {
    let name = '';
    let id;
    if (this.props.student) {
      name = this.props.student.first_name + ' ' + this.props.student.last_name;
      id = this.props.student.id;
    }
    let html = '';
    let answers = this.props.answers;
    if (this.props.questions && this.props.questions.length > 0) {
      html = this.props.questions.map((questionid, index) => {
        let qnId = id + '_' + questionid;
        let value = answers[qnId];
        let disabled = false;
        let displayValue = '';
        if (value) {
          disabled = value.double_entry == 2;
          displayValue = value.answer_score || value.answer_grade;
        }

        return (
          <td id={qnId}>
            <input
              id={qnId}
              disabled={disabled}
              value={this.getAnswerForQn(qnId)}
              type="text"
              required
              className="form-control"
              style={{ color: 'red', padding: '0px', width: '30px' }}
              onChange={this.handleAnswerInput.bind(this, id, qnId)}
            />
          </td>
        );
      });
    }

    return (
      <tr id={id} onClick={this.toggle}>
        <td>{id}</td>
        <td colSpan="2"> {name}</td>
        {html}
        <td>
          <button
            className="btn btn-primary glyphicon glyphicon-pencil"
            onClick={() => {
              console.log('Edit Button Clicked');
            }}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            id={'save_' + id}
            onClick={this.saveAnswers.bind(this)}
            className="btn btn-primary"
          >
            Save
          </button>
        </td>
      </tr>
    );
  }
}

// });

// export default Example;
