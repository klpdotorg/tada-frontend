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
            <th>Order</th>
            <th>Text</th>
            <th>Type</th>
            <th>Min Mk</th>
            <th>Max Mk</th>
            <th>Grade Set</th>
            <th>Actions</th>
          </tr>
          {questions.map((id) => {
            return <Question id={id} />;
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
