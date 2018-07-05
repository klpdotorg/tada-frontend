import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Select from 'react-select';

import { dateFormat, between } from '../../utils';

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
      {Object.keys(questions).map((questionId) => {
        const question = get(questions, `${questionId}.question_details`, {});
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
                onChange={(newVal) => {
                  const filterVal = newVal.map((item) => {
                    return item.value;
                  });
                  props.onChange(filterVal, id, question.id);
                }}
                options={options.map((val) => {
                  return {
                    label: val,
                    value: val,
                  };
                })}
              />
            </td>
          );
        }

        if (questionType === 'Radio') {
          return (
            <td key={question.id} className="answer-field">
              <Select
                name="form-field-name"
                style={{ minWidth: 200 }}
                value={value}
                menuContainerStyle={{ zIndex: 9999 }}
                onChange={(val) => {
                  const newVal = val ? val.value : '';
                  props.onChange(newVal, id, question.id);
                }}
                options={options.map((val) => {
                  return {
                    label: val,
                    value: val,
                  };
                })}
              />
            </td>
          );
        }

        if (questionType === 'NumericBox') {
          return (
            <td key={question.id} className="answer-field">
              <input
                id={question.id}
                value={value}
                type="number"
                min={question.pass_score}
                max={question.max_score}
                required
                className="form-control"
                onChange={(e) => {
                  if (between(e.target.value, 0, question.max_score)) {
                    props.onChange(e.target.value, id, question.id);
                  } else {
                    props.infoNotification(
                      'Warning: ',
                      `Enter value between 0 and ${question.max_score}.`,
                    );
                  }
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
