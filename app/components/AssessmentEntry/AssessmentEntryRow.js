import React from 'react';
import PropTypes from 'prop-types';
import { get, map } from 'lodash';

const AssessmentEntryRowView = (props) => {
  const { id, name, answers, questions, assessmentId } = props;
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
      {map(questions, (question) => {
        const currentVal = answers.find((answer) => {
          return answer.question === question.id;
        });

        return (
          <td key={question.id}>
            <input
              id={question.id}
              value={get(currentVal, 'answer', '')}
              type="text"
              required
              className="form-control"
              style={{ color: 'red', padding: '0px', width: '30px' }}
              onChange={(e) => {
                const value = {
                  [question.id]: {
                    value: e.target.value,
                  },
                };
                props.onChange(value, id);
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
          id={`save_${id}`}
          onClick={() => {
            props.onSave({
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
  id: PropTypes.number,
  name: PropTypes.string,
  questions: PropTypes.object,
  answers: PropTypes.object,
  onSave: PropTypes.func,
  assessmentId: PropTypes.any,
};

export { AssessmentEntryRowView };
