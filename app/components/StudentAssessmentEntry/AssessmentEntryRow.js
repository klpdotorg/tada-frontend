import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import map from 'lodash.map';

import { dateFormat } from '../../utils';

const AssessmentEntryRowView = (props) => {
  const {
    id,
    name,
    answers,
    questions,
    assessmentId,
    groupValue,
    dateOfVisit,
    rowId,
    answergroupId,
    boundaryInfo,
  } = props;
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
      <td>
        <input
          value={groupValue}
          type="text"
          required
          className="form-control"
          style={{ padding: '0px' }}
          onChange={(e) => {
            props.onChangeGroupValue(answergroupId, e.target.value);
          }}
        />
      </td>
      <td>
        <input
          value={dateFormat(new Date(dateOfVisit))}
          data-date-format="dd-mm-yyyy"
          type="date"
          required
          className="form-control"
          style={{ padding: '0px' }}
          onChange={(e) => {
            props.onChangeDateOfVisit(answergroupId, new Date(e.target.value));
          }}
        />
      </td>
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
                {question.options.map((val, index) => {
                  return <option key={index}>{val}</option>;
                })}
              </select>
            </td>
          );
        }

        if (questionType === 'Radio') {
          return (
            <td key={question.id} className="answer-field">
              <select className="form-control" value={get(currentVal, 'answer', '')}>
                {question.options.map((val, index) => {
                  return <option key={index}>{val}</option>;
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
                props.onChange(rowId, currentVal.id, e.target.value);
              }}
            />
          </td>
        );
      })}
      <td>
        <button
          disabled
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
              ...boundaryInfo,
              answergroupId,
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
  onChangeDateOfVisit: PropTypes.func,
  onChangeGroupValue: PropTypes.func,
  answergroupId: PropTypes.any,
  boundaryInfo: PropTypes.object,
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
