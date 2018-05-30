import React from 'react';
import PropTypes from 'prop-types';

import { Message } from '../common';
import { Question } from '../../containers/Questions';

const QuestionListView = ({ questions, assessmentId }) => {
  return (
    <div className="border-table">
      <table className="table table-striped" style={{ marginBottom: 0 }}>
        <tbody>
          <tr className="info">
            <th>Question #</th>
            <th>Text</th>
            <th>Type</th>
            <th>Key</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {questions.map((id) => {
            return <Question id={id} key={id} assessmentId={assessmentId} />;
          })}
        </tbody>
      </table>
      {!questions.length ? (
        <div className="base-spacing">
          <Message message="No questions Found!" />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

QuestionListView.propTypes = {
  questions: PropTypes.array,
  assessmentId: PropTypes.any,
};

export { QuestionListView };
