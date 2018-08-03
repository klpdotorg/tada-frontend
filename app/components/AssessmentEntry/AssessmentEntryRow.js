import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Select from 'react-select';
import moment from 'moment';

import { dateFormat, between } from '../../utils';

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
    comment,
    commentRequired,
    groupText,
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
      {groupText ? (
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
      ) : (
        <td style={{ display: 'none' }} />
      )}
      <td>
        <input
          value={dateFormat(dateOfVisit)}
          // data-date-format="dd-mm-yyyy"
          type="date"
          required
          className="form-control"
          onChange={(e) => {
            props.onChangeDateOfVisit(
              answergroupId,
              moment(e.target.value).format('YYYY-MM-DDThh:mm'),
            );
          }}
        />
      </td>
      {commentRequired ? (
        <td>
          <input
            value={comment}
            type="text"
            required
            className="form-control"
            onChange={(e) => {
              props.onChangeComments(answergroupId, e.target.value);
            }}
          />
        </td>
      ) : (
        <td style={{ display: 'none' }} />
      )}
      {Object.keys(questions).map((questionId) => {
        const question = get(questions, questionId, {});
        const questionType = get(question, 'question_type');
        const currentVal = answers.find((answer) => {
          return answer.question === question.id;
        });
        const questionOptions = get(question, 'options', []) || [];
        const options = questionOptions.filter((n) => {
          return n;
        });

        if (questionType === 'CheckBox') {
          const answerVal = get(currentVal, 'answer', []);
          return (
            <td key={question.id} className="answer-field">
              <Select
                name="form-field-name"
                style={{ minWidth: 200 }}
                value={answerVal}
                menuContainerStyle={{ zIndex: 9999 }}
                multi
                onChange={(val) => {
                  const filterVal = val.map((item) => {
                    return item.value;
                  });
                  if (currentVal && currentVal.id) {
                    props.onChange(rowId, currentVal.id, filterVal);
                  } else {
                    props.onChange(rowId, '', filterVal, question.id);
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
                value={get(currentVal, 'answer', '')}
                onChange={(val) => {
                  const newVal = val ? val.value : '';
                  if (currentVal && currentVal.id) {
                    props.onChange(rowId, currentVal.id, newVal);
                  } else {
                    props.onChange(rowId, '', newVal, question.id);
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
            <td key={question.id} className="answer-field">
              <input
                id={question.id}
                value={get(currentVal, 'answer', '')}
                type="date"
                data-date-format="dd-mm-yyyy"
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
  comment: PropTypes.string,
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
  onChangeComments: PropTypes.func,
  rowId: PropTypes.any,
  commentRequired: PropTypes.bool,
  groupText: PropTypes.string,
};

export { AssessmentEntryRowView };
