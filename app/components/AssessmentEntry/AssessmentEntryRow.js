import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import map from 'lodash.map';

const AssessmentEntryRowView = (props) => {
  const { id, name, answers, questions, assessmentId, groupValue, dateOfVisit, rowId } = props;
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
      <td>{groupValue}</td>
      <td>{dateOfVisit}</td>
      {map(questions, (question) => {
        const questionType = get(question, 'question_type');
        const currentVal = answers.find((answer) => {
          return answer.question === question.id;
        });

        if (questionType === 'CheckBox') {
          return (
            <td key={question.id} className="answer-field">
              <select
                className="form-control"
                value={get(currentVal, 'answer', '')}
                onChange={(e) => {
                  props.onChange(rowId, currentVal.id, e.target.value);
                }}
              >
                {question.options.map((val) => {
                  return <option>{val}</option>;
                })}
              </select>
            </td>
          );
        }

        if (questionType === 'Radio') {
          return (
            <td key={question.id} className="answer-field">
              <select className="form-control" value={get(currentVal, 'answer', '')}>
                {question.options.map((val) => {
                  return <option>{val}</option>;
                })}
              </select>
            </td>
          );
        }

        return (
          <td key={question.id} className="answer-field">
            <input
              id={question.id}
              value={get(currentVal, 'answer', '')}
              type="text"
              required
              className="form-control"
              style={{ padding: '0px' }}
              onChange={(e) => {
                props.onChange(rowId, id, e.target.value);
              }}
            />
          </td>
        );
      })}
      <td>
        <button
          className="btn btn-primary padded-btn"
          title="Edit answer"
          data-toggle="tooltip"
          onClick={() => {
            // console.log('Edit Button Clicked');
          }}
        >
          Edit
          <span className="fa fa-pencil-square-o" />
        </button>
      </td>
      <td>
        <button
          id={`save_${id}`}
          onClick={() => {
            props.onSave({
              assessmentId,
              boundaryId: id,
            });
          }}
          className="btn btn-primary"
        >
          Save
        </button>
      </td>
    </tr>
  );
};

AssessmentEntryRowView.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  questions: PropTypes.object,
  answers: PropTypes.array,
  onSave: PropTypes.func,
  assessmentId: PropTypes.any,
  groupValue: PropTypes.string,
  dateOfVisit: PropTypes.any,
  rowId: PropTypes.any,
};

export { AssessmentEntryRowView };
