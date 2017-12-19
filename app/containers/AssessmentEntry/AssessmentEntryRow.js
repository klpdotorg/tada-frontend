import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AssessmentEntryRowView extends Component {
  render() {
    const { id, name, answers, questions } = this.props;

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
        {questions.map((question) => {
          return (
            <td id={question.id} className={inputClassName}>
              <input
                id={question.id}
                // disabled={disabled}
                value={answers[question.id]}
                type="text"
                required
                className="form-control"
                style={{ color: 'red', padding: '0px', width: '30px' }}
                onChange={() => {
                  this.handleAnswerInput.bind(this, id, question.id);
                }}
              />
            </td>
          );
        })}
        <td>
          <button
            className="btn btn-primary glyphicon glyphicon-pencil"
            onClick={() => {
              // console.log('Edit Button Clicked');
            }}
          >
            Edit
          </button>
        </td>
        <td>
          <button id={`save_${id}`} onClick={this.saveAnswer} className="btn btn-primary">
            Save
          </button>
        </td>
      </tr>
    );
  }
}

const AssessmentEntryRow = connect()(AssessmentEntryRowView);

export { AssessmentEntryRow };
