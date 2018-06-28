import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import { dateFormat } from '../../utils';
import { MultiSelect, Select } from '../common';

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
          onChange={(e) => {
            props.onChangeDateOfVisit(answergroupId, new Date(e.target.value));
          }}
        />
      </td>
      {Object.keys(questions).map((questionId, i) => {
        const question = questions[questionId];
        const questionType = get(question, 'question_type');
        const currentVal = answers.find((answer) => {
          return answer.question === question.id;
        });
        const options = question.options.filter((n) => {
          return n;
        });

        if (questionType === 'CheckBox') {
          const answerVal = get(currentVal, 'answer', []);
          return (
            <td key={question.id} className="answer-field">
              <MultiSelect
                value={typeof answerVal === 'object' ? answerVal : [answerVal]}
                options={options.map((val) => {
                  return {
                    label: val,
                    value: val,
                  };
                })}
                onChange={(val) => {
                  if (currentVal && currentVal.id) {
                    props.onChange(rowId, currentVal.id, val);
                  } else {
                    props.onChange(rowId, '', val, question.id);
                  }
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
                value={get(currentVal, 'answer', '')}
                onChange={(val) => {
                  if (currentVal && currentVal.id) {
                    props.onChange(rowId, currentVal.id, val);
                  } else {
                    props.onChange(rowId, '', val, question.id);
                  }
                }}
              />
            </td>
          );
        }

        if (questionType === 'NumericBox') {
          return (
            <td key={question.id} className="answer-field">
              <input
                id={question.id}
                value={get(currentVal, 'answer', '')}
                type="number"
                min={question.pass_score}
                max={question.max_score}
                required
                className="form-control"
                onChange={(e) => {
                  if (currentVal && currentVal.id) {
                    props.onChange(rowId, currentVal.id, e.target.value);
                  } else {
                    props.onChange(rowId, '', e.target.value, question.id);
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
              value={get(currentVal, 'answer', '')}
              type="text"
              required
              className="form-control"
              onChange={(e) => {
                if (currentVal && currentVal.id) {
                  props.onChange(rowId, currentVal.id, e.target.value);
                } else {
                  props.onChange(rowId, '', e.target.value, question.id);
                }
              }}
            />
          </td>
        );
      })}
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
