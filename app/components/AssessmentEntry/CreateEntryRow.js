import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Select from 'react-select';
import moment from 'moment';

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
    comment,
    commentRequired,
    groupText,
    respondentTypeRequired,
    respondentTypes,
    respondentTypeVal,
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
      {groupText ? (
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
      ) : (
        <td style={{ display: 'none' }} />
      )}
      <td className="answer-field">
        <input
          value={dateFormat(dateOfVisit)}
          // data-date-format="dd-mm-yyyy"
          type="date"
          required
          className="form-control"
          onChange={(e) => {
            props.onChangeDateOfVisit(id, moment(e.target.value).format('YYYY-MM-DDThh:mm'));
          }}
        />
      </td>
      {respondentTypeRequired ? (
        <td>
          <Select
            options={respondentTypes}
            style={{ minWidth: 100 }}
            value={respondentTypeVal}
            onChange={(val) => {
              props.onChangeRespondentType(id, val.value);
            }}
          />
        </td>
      ) : (
        <td style={{ display: 'none' }} />
      )}
      {commentRequired ? (
        <td>
          <input
            value={comment}
            type="text"
            required
            className="form-control"
            onChange={(e) => {
              props.onChangeComments(id, e.target.value);
            }}
          />
        </td>
      ) : (
        <td style={{ display: 'none' }} />
      )}

      {questions.map((questionVal) => {
        const question = get(questionVal, ['question_details'], {});
        const questionType = get(question, 'question_type');
        const value = get(answers, [id, question.id, 'value'], '');
        const questionOptions = get(question, 'options', []) || [];
        const options = questionOptions.filter((n) => {
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
                  const newVal = val ? val.value : '';
                  props.onChange(newVal, id, question.id);
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

        if (questionType === 'Date') {
          return (
            <td key={question.id} className="answer-field">
              <input
                id={question.id}
                value={value}
                type="date"
                data-date-format="dd-mm-yyyy"
                required
                className="form-control"
                onChange={(e) => {
                  props.onChange(e.target.value, id, question.id);
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
            if (props.resetRow) {
              props.resetRow();
            }
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
  questions: PropTypes.array,
  answers: PropTypes.object,
  comment: PropTypes.string,
  assessmentId: PropTypes.any,
  groupValue: PropTypes.string,
  dateOfVisit: PropTypes.string,
  boundaryInfo: PropTypes.object,
  onChangeDateOfVisit: PropTypes.func,
  onSave: PropTypes.func,
  onChangeGroupValue: PropTypes.func,
  resetRow: PropTypes.func,
  onChangeComments: PropTypes.func,
  commentRequired: PropTypes.bool,
  groupText: PropTypes.string,
  onChangeRespondentType: PropTypes.func,
  respondentTypes: PropTypes.array,
  respondentTypeVal: PropTypes.string,
  respondentTypeRequired: PropTypes.bool,
};

export { CreateEntryRowView };
