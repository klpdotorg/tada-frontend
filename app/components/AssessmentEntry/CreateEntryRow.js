import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Select from 'react-select';

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
          onChange={(e) => {
            props.onChangeDateOfVisit(id, new Date(e.target.value).toISOString());
          }}
        />
      </td>
      {Object.keys(questions).map((questionId) => {
        const question = questions[questionId];
        const questionType = get(question, 'question_type');
        const value = get(answers, [id, question.id, 'value'], '');
        const options = question.options.filter((n) => {
          return n;
        });

        if (questionType === 'CheckBox') {
          return (
            <td key={question.id} className="answer-field">
              <Select
                name="form-field-name"
                style={{ minWidth: 200 }}
                value={value}
                menuContainerStyle={{ zIndex: 9999 }}
                multi
                options={options.map((val) => {
                  return {
                    label: val,
                    value: val,
                  };
                })}
                onChange={(val) => {
                  const filterVal = val.map((item) => {
                    return item.value;
                  });
                  props.onChange(filterVal, id, question.id);
                }}
              />
            </td>
          );
        }

        if (questionType === 'Radio') {
          return (
            <td key={question.id} className="answer-field">
              <Select
                options={options.map((val) => {
                  return {
                    label: val,
                    value: val,
                  };
                })}
                style={{ minWidth: 100 }}
                value={value}
                onChange={(val) => {
                  props.onChange(val.value, id, question.id);
                }}
              />
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
              onChange={(e) => {
                props.onChange(e.target.value, id, question.id);
              }}
            />
          </td>
        );
      })}
      <td>
        <button
          onClick={() => {
            props.onSave({
              ...boundaryInfo,
              assessmentId,
              boundaryId: id,
            });
            props.resetRow();
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
  dateOfVisit: PropTypes.object,
  boundaryInfo: PropTypes.object,
  onChangeDateOfVisit: PropTypes.func,
  onSave: PropTypes.func,
  onChangeGroupValue: PropTypes.func,
};

export { CreateEntryRowView };
