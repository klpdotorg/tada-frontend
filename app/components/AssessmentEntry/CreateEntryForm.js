import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import map from 'lodash.map';

import { dateFormat } from '../../utils';

const CreateEntryFormView = (props) => {
  const { rows, answers, questions, assessmentId, groupValues } = props;
  return (
    <tbody>
      {rows.map((row) => {
        const groupValue = get(groupValues, row.id, '');
        return (
          <tr>
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
                style={{ padding: '0px' }}
                onChange={(e) => {
                  props.changeGroupValue(e.target.value);
                }}
              />
            </td>
            <td className="answer-field">
              <input
                value={dateFormat(new Date())}
                data-date-format="dd-mm-yyyy"
                type="date"
                required
                className="form-control"
                style={{ padding: '0px' }}
                onChange={(e) => {
                  props.changeDateOfVisit(e.target.value);
                }}
              />
            </td>
            {map(questions, (question, i) => {
              const questionType = get(question, 'question_type');
              const value = get(answers, [row.id, question.id, 'value'], '');

              if (questionType === 'CheckBox') {
                return (
                  <td key={question.id + i} className="answer-field">
                    <select
                      className="form-control"
                      value={value}
                      onChange={(e) => {
                        props.onChange(e.target.value, row.id, question.id);
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
                      props.onChange(e.target.value, row.id, question.id);
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
                onClick={() => {
                  props.onSave({
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
  answers: PropTypes.array,
  assessmentId: PropTypes.any,
  groupValues: PropTypes.array,
  rows: PropTypes.object,
};

export { CreateEntryFormView };
