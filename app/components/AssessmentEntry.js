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
import Bootstrap from 'bootstrap';

const val = [0, 1];
export default class AssessmentEntry extends React.Component {
  // const Example = React.createClass({

  saveEntry = (studentId, answers) => {
    this.hideDangerAlert();
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
        this.props.dispatch(Notifications.success(answersSaved));
      })
      .catch(error => {
        console.log(error);
        this.props.dispatch(Notifications.error(answersNotSaved));
      });
  };

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sortStudentsAlpha = this.sortStudentsAlpha.bind(this);
    this.hideDangerAlert = this.hideDangerAlert.bind(this);
    this.state = {
      answers: {},
      showAlert: false,
    };
    this.saveEntry = this.saveEntry.bind(this);
  }

  showDangerAlert() {
    this.setState({
      showAlert: true,
    });
  }

  hideDangerAlert() {
    this.setState({
      showAlert: false,
    });
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
              showAlert={this.showDangerAlert.bind(this)}
              hideAlert={this.hideDangerAlert.bind(this)}
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
    let alert = (
      <div className="alert alert-danger alert-dismissible" role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <p>
          <strong>Warning!</strong> You have entered values which don't match existing answers.
          Please check the red-colored boxes and correct the answer if needed. Then, press "Save".
          Your answer will overwrite existing answer.
        </p>
      </div>
    );
    return (
      <div>
        {this.state.showAlert ? alert : null}
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
      answers: initAnswers,
      verify: [],
      errors: [],
    };
    this.handleAnswerInput = this.handleAnswerInput.bind(this);
    this.getAnswerForQn = this.getAnswerForQn.bind(this);
    this.saveAnswers = this.saveAnswers.bind(this);
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
  }

  getAnswerForQn(questionId) {
    let qnId = questionId.split('_')[1];
    let answer = this.state.answers[qnId];
    if (!answer) answer = '';
    return answer;
  }

  toggle() {
    this.setState({});
  }

  saveAnswers() {
    let postAnswers = [];
    let errorObj = [];
    let verifyQns = [];
    let error = false;
    Object.keys(this.state.answers).map(questionId => {
      let answer = {};
      let studentQnIdCombo = this.props.student.id + '_' + questionId;
      if (
        this.props.answers[studentQnIdCombo] &&
        this.props.answers[studentQnIdCombo].double_entry == 1
      ) {
        let existingAnswer =
          this.props.answers[studentQnIdCombo].answer_score ||
          this.props.answers[studentQnIdCombo].answer_grade;
        if (this.state.answers[questionId] == existingAnswer) {
          answer = {
            qnId: questionId,
            value: this.state.answers[questionId],
          };
          postAnswers.push(answer);
        } else {
          if (this.state.verify.indexOf(questionId) > -1) {
            //We've checked this once already and alerted. DEO has still entered same answer again and pressed Submit. Allow them to proceed and overwrite existing answer
            // Don't set error=true here!!
            answer = {
              qnId: questionId,
              value: this.state.answers[questionId],
            };
            postAnswers.push(answer);
          } else {
            //Answer doesn't match existing answer for double entry. Add it to the errors array
            error = true;
            errorObj.push(questionId);
            //Push the entry to verify so we know this answer has already been checked once and alerted.
            verifyQns.push(questionId);
          }
        }
      } else {
        // No double entry..this is a fresh answer, send it as POST as-is.
        answer = {
          qnId: questionId,
          value: this.state.answers[questionId],
        };
        postAnswers.push(answer);
      }
    });

    if (!error) {
      this.props.hideAlert();
      //post answers here
      console.log('POSTING ANSWERS');
      this.setState({
        errors: [],
        verify: [],
      });
      this.props.saveEntry(this.props.student.id, postAnswers);
    } else {
      this.props.showAlert();
      //Set state for errors..
      this.setState({
        errors: errorObj,
        verify: verifyQns,
      });
    }
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
        let displayValue = this.getAnswerForQn(qnId);
        if (value) {
          if (
            value.history &&
            value.history.created_by != parseInt(sessionStorage.getItem('userid')) &&
            value.double_entry == 1
          ) {
            //In this case, this current user is about to verify the assessment answer by double entry. Hence, don't show the
            //existing answer in the UI
            displayValue = '';
          } else {
            disabled = value.double_entry == 2;
          }
        }
        let inputClassName = '';

        if (this.state.errors.indexOf(questionid.toString()) > -1) {
          inputClassName = 'has-error danger';
        }
        return (
          <td id={qnId} className={inputClassName}>
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
      <tr>
        <td>{id}</td>
        <td
          className="td-student-name"
          colSpan="2"
          data-toggle="popover"
          data-trigger="focus"
          title="Student Info"
          data-content={name}
        >
          {name}
        </td>
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

  componentDidMount() {
    $('.td-student-name').popover({
      placement: 'top',
      trigger: 'hover',
    });
  }
}

// });

// export default Example;
