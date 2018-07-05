import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import { checkPermissions } from '../../checkPermissions';

const QuestionView = (props) => {
  const { isAdmin, groups, question } = props;
  const { question_text, display_text, key, question_type, id } = get(question, 'question_details');
  const editQuestion = isAdmin || checkPermissions(groups, 'editQuestion');
  const deleteQuestion = isAdmin || checkPermissions(groups, 'deleteQuestion');

  return (
    <tr>
      <td>{question_text}</td>
      <td>{display_text}</td>
      <td>{question_type}</td>
      <td>{key}</td>
      <td>
        <button
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Edit Question"
          onClick={() => {
            props.editQuestion(id);
          }}
          disabled={!editQuestion}
        >
          <span className="fa fa-pencil-square-o" />
        </button>
      </td>
      <td>
        <button
          className="btn btn-primary padded-btn"
          data-toggle="tooltip"
          title="Delete Question"
          disabled={!deleteQuestion}
          onClick={() => {
            props.deleteQuestion(props.assessmentId, id);
          }}
        >
          <span className="fa fa-trash" />
        </button>
      </td>
    </tr>
  );
};

QuestionView.propTypes = {
  isAdmin: PropTypes.bool,
  groups: PropTypes.array,
  question: PropTypes.object,
  editQuestion: PropTypes.func,
  deleteQuestion: PropTypes.func,
  assessmentId: PropTypes.any,
};

export { QuestionView };
