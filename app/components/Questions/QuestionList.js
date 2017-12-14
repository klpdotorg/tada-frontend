import React from 'react';
import PropTypes from 'prop-types';

import { Question } from '../../containers/Questions';

const QuestionListView = ({ questions }) => {
  return (
    <div>
      <table className="table table-bordered table-striped">
        <tbody>
          <tr className="info">
            <th>Question #</th>
            <th>Text</th>
            <th>Type</th>
            <th>Key</th>
            <th>Actions</th>
          </tr>
          {questions.map((id) => {
            return <Question id={id} key={id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

QuestionListView.propTypes = {
  questions: PropTypes.array,
};

export { QuestionListView };
