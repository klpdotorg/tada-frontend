import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import { dateFormat } from '../../utils';

const CreateEntryFormView = (props) => {
  const { rows, answers, questions, assessmentId, groupValues, dateOfVisits, boundaryInfo } = props;
  return (
    <tbody>
      {rows.map((row) => {
        const groupValue = get(groupValues, row.id, '');
        const dateOfVisit = get(dateOfVisits, row.id, new Date());
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
            {Object.keys(questions).map((questionId) => {
              const question = questions[questionId];
              const questionType = get(question, 'question_type');
              const value = get(answers, [row.id, question.id, 'value'], '');

              if (questionType === 'CheckBox') {
                return (
                  <td key={question.id} className="answer-field">
                    <select
                      className="form-control"
                      value={value}
                      onChange={(e) => {
                        props.onChange(e.target.value, row.id, question.id);
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
};

export { CreateEntryFormView };
