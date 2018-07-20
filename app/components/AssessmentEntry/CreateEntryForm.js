import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import Select from 'react-select';

import { dateFormat, between } from '../../utils';

const CreateEntryFormView = (props) => {
  const {
    rows,
    answers,
    questions,
    assessmentId,
    groupValues,
    dateOfVisits,
    boundaryInfo,
    comments,
    commentRequired,
  } = props;
  return (
    <tbody>
      {rows.map((row) => {
        const groupValue = get(groupValues, row.id, '');
        const dateOfVisit = get(dateOfVisits, row.id, new Date());
        const comment = get(comments, row.id, '');
        return (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td
              className="td-student-name"
              colSpan="2"
              data-toggle="popover"
              data-trigger="focus"
              title="Student Info"
              data-content={row.name}
            >
              {row.name}
            </td>
            <td className="answer-field">
              <input
                value={groupValue}
                type="text"
                required
                className="form-control"
                onChange={(e) => {
                  props.onChangeGroupValue(row.id, e.target.value);
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
                  props.onChangeDateOfVisit(row.id, new Date(e.target.value).toISOString());
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
                    props.onChangeComments(row.id, e.target.value);
                  }}
                />
              </td>
            ) : (
              <td style={{ display: 'none' }} />
            )}
            {Object.keys(questions).map((questionId) => {
              const question = get(questions, questionId, {});
              const questionType = get(question, 'question_type');
              const value = get(answers, [row.id, question.id, 'value'], '');
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
                      onChange={(newVal) => {
                        const filterVal = newVal.map((item) => {
                          return item.value;
                        });
                        props.onChange(filterVal, row.id, question.id);
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
                        props.onChange(newVal, row.id, question.id);
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
                          props.onChange(e.target.value, row.id, question.id);
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
                      className="form-control"
                      onChange={(e) => {
                        props.onChange(e.target.value, row.id, question.id);
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
                      props.onChange(e.target.value, row.id, question.id);
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
                    boundaryId: row.id,
                  });
                }}
                className="btn btn-primary"
              >
                Save
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

CreateEntryFormView.propTypes = {
  questions: PropTypes.object,
  answers: PropTypes.object,
  assessmentId: PropTypes.any,
  groupValues: PropTypes.object,
  rows: PropTypes.array,
  dateOfVisits: PropTypes.object,
  boundaryInfo: PropTypes.object,
  comments: PropTypes.object,
  commentRequired: PropTypes.bool,
};

export { CreateEntryFormView };
