import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Select from 'react-select';

import { getDateWithDateAndTime, dateFormat, between } from '../../utils';

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
    commentRequired,
    comment,
    groupText,
    disabled,
    respondentTypes,
    respondentTypeRequired,
    respondentTypeVal,
  } = props;
  return (
    <tr>
      <td className="id-field">{id}</td>
      <td
        className="td-student-name text-field"
        colSpan="2"
        data-toggle="popover"
        data-trigger="focus"
        title="Student Info"
        data-content={name}
      >
        {name}
      </td>
      {groupText ? (
        <td className="input-field">
          <input
            value={groupValue}
            type="text"
            required
            className="form-control"
            disabled={disabled}
            onChange={(e) => {
              props.onChangeGroupValue(answergroupId, e.target.value);
            }}
          />
        </td>
      ) : (
        <td style={{ display: 'none' }} />
      )}
      <td className="multi-select">
        <input
          value={dateFormat(dateOfVisit)}
          type="date"
          required
          className="form-control"
          disabled={disabled}
          onChange={(e) => {
            props.onChangeDateOfVisit(answergroupId, getDateWithDateAndTime(e.target.value));
          }}
        />
      </td>
      {respondentTypeRequired ? (
        <td className="input-field">
          <Select
            options={respondentTypes}
            value={respondentTypeVal}
            disabled={disabled}
            onChange={(val) => {
              props.onChangeRespondentType(answergroupId, val.value);
            }}
          />
        </td>
      ) : (
        <td style={{ display: 'none' }} />
      )}
      {commentRequired ? (
        <td className="input-field">
          <input
            value={comment}
            type="text"
            required
            className="form-control"
            disabled={disabled}
            onChange={(e) => {
              props.onChangeComments(answergroupId, e.target.value);
            }}
          />
        </td>
      ) : (
        <td style={{ display: 'none' }} />
      )}
      {questions.map((questionVal) => {
        const question = get(questionVal, ['question_details'], {});
        const questionType = get(question, 'question_type');
        const currentVal = answers.find((answer) => {
          return answer.question === question.id;
        });
        const questionOptions = get(question, 'options', []) || [];
        const options = questionOptions.filter((n) => {
          return n;
        });

        if (questionType === 'CheckBox') {
          return (
            <td key={question.id} className="answer-field multi-select">
              <Select
                name="form-field-name"
                value={get(currentVal, 'answer', '')}
                menuContainerStyle={{ zIndex: 9999 }}
                multi
                disabled={disabled}
                onChange={(newVal) => {
                  const filterVal = newVal.map((item) => {
                    return item.value;
                  });
                  if (currentVal && currentVal.id) {
                    props.onChange(rowId, currentVal.id, filterVal);
                  } else {
                    props.onChange(rowId, '', filterVal, question.id);
                  }
                  // const filterVal = newVal.map((item) => {
                  //   return item.value;
                  // });
                  // props.onChange(rowId, currentVal.id, filterVal);
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
            <td key={question.id} className="answer-field multi-select">
              <Select
                name="form-field-name"
                value={get(currentVal, 'answer', '')}
                menuContainerStyle={{ zIndex: 9999 }}
                disabled={disabled}
                onChange={(val) => {
                  const newVal = val ? val.value : '';
                  if (currentVal && currentVal.id) {
                    props.onChange(rowId, currentVal.id, newVal);
                  } else {
                    props.onChange(rowId, '', newVal, question.id);
                  }
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
            <td key={question.id} className="answer-field input-field">
              <input
                id={question.id}
                value={get(currentVal, 'answer', '')}
                type="number"
                min={question.pass_score}
                max={question.max_score}
                required
                disabled={disabled}
                className="form-control"
                onChange={(e) => {
                  if (between(e.target.value, 0, question.max_score)) {
                    if (currentVal && currentVal.id) {
                      props.onChange(rowId, currentVal.id, e.target.value);
                    } else {
                      props.onChange(rowId, '', e.target.value, question.id);
                    }
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

        if (questionType === 'Date') {
          return (
            <td key={question.id} className="answer-field multi-select">
              <input
                id={question.id}
                value={dateFormat(get(currentVal, 'answer', new Date()))}
                type="date"
                data-date-format="dd-mm-yyyy"
                required
                disabled={disabled}
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
          <td key={question.id} className="answer-field input-field">
            <input
              id={question.id}
              value={get(currentVal, 'answer', '')}
              type="text"
              required
              disabled={disabled}
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
      <td className="input-field">
        <button
          id={`save_${id}`}
          onClick={() => {
            props.onSave({
              ...boundaryInfo,
              answergroupId: rowId,
              assessmentId,
              boundaryId: id,
            });
          }}
          className="btn btn-primary"
          disabled={disabled}
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
  comment: PropTypes.string,
  id: PropTypes.any,
  name: PropTypes.string,
  questions: PropTypes.array,
  answers: PropTypes.array,
  onSave: PropTypes.func,
  assessmentId: PropTypes.any,
  groupValue: PropTypes.string,
  dateOfVisit: PropTypes.any,
  rowId: PropTypes.any,
  onChangeComments: PropTypes.func,
  commentRequired: PropTypes.bool,
  groupText: PropTypes.string,
  onChangeRespondentType: PropTypes.func,
  respondentTypes: PropTypes.array,
  respondentTypeVal: PropTypes.string,
  respondentTypeRequired: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default AssessmentEntryRowView;
