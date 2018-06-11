import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import map from 'lodash.map';

import { dateFormat } from '../../utils';

const CreateEntryRowView = (props) => {
  const {
    id,
    name,
    answers,
    questions,
    assessmentId,
    groupValue,
    dateOfVisit,
    boundaryInfo,
  } = props;
  return (
    <tr key={id}>
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
      <td className="answer-field">
        <input
          value={groupValue}
          type="text"
          required
          className="form-control"
          style={{ padding: '0px' }}
          onChange={(e) => {
            props.onChangeGroupValue(id, e.target.value);
          }}
        />
      </td>
      <td className="answer-field">
        <input
          value={dateFormat(dateOfVisit)}
          data-date-format="dd-mm-yyyy"
          type="date"
          required
          className="form-control"
          style={{ padding: '0px' }}
          onChange={(e) => {
            props.onChangeDateOfVisit(id, new Date(e.target.value).toISOString());
          }}
        />
      </td>
      {map(questions, (question, i) => {
        const questionType = get(question, 'question_type');
        const value = get(answers, [id, question.id, 'value'], '');

        if (questionType === 'CheckBox') {
          return (
            <td key={question.id} className="answer-field">
              <select
                className="form-control"
                value={value}
                onChange={(e) => {
                  props.onChange(e.target.value, id, question.id);
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
              <select className="form-control" value={value}>
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
              value={value}
              type="text"
              required
              className="form-control"
              style={{ padding: '0px' }}
              onChange={(e) => {
                props.onChange(e.target.value, id, question.id);
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
          disabled
        >
          Edit
          <span className="fa fa-pencil-square-o" />
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            props.onSave({
              ...boundaryInfo,
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

CreateEntryRowView.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  questions: PropTypes.object,
  answers: PropTypes.object,
  assessmentId: PropTypes.any,
  groupValue: PropTypes.string,
  dateOfVisit: PropTypes.string,
  boundaryInfo: PropTypes.object,
  onChangeDateOfVisit: PropTypes.func,
  onSave: PropTypes.func,
  onChangeGroupValue: PropTypes.func,
};

export { CreateEntryRowView };
