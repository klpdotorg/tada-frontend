import React from 'react';
import PropTypes from 'prop-types';

import { Message } from '../common';
import { Question } from './index';

const QuestionListView = ({ questions }) => {
  return (
    <div className="border-table">
      <table className="table table-striped" style={{ marginBottom: 0 }}>
        <tbody>
          <tr className="info">
            <th>Question #</th>
            <th>Text</th>
            <th>Type</th>
            <th>Key</th>
            <th>Actions</th>
          </tr>
          {questions.map((question, i) => {
            return <Question question={question} key={i} />;
          })}
        </tbody>
      </table>
      {!questions.length ? (
        <div className="base-spacing">
          <Message message="No Assessments Found!" />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

QuestionListView.propTypes = {
  questions: PropTypes.array,
};

export { QuestionListView };
