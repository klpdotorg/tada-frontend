import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const AssessmentEntryRowView = (props) => {
  const { id, name, answers, questions } = props;

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
        const currentVal = get(answers, [id, question.id, 'value'], '');
        console.log(currentVal);
        return (
          <td key={question.id}>
            <input
              id={question.id}
              value={currentVal}
              type="text"
              required
              className="form-control"
              style={{ color: 'red', padding: '0px', width: '30px' }}
              onChange={(e) => {
                const value = {
                  [question.id]: {
                    value: e.target.value,
                  },
                };
                props.onChange(value, id);
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
        <button id={`save_${id}`} onClick={props.saveAnswer} className="btn btn-primary">
          Save
        </button>
      </td>
    </tr>
  );
};

AssessmentEntryRowView.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  questions: PropTypes.array,
  answers: PropTypes.object,
  saveAnswer: PropTypes.func,
};

export { AssessmentEntryRowView };
