import { connect } from 'react-redux';
import { filter } from 'lodash';

import { QuestionListView } from '../../components/Questions';

const mapStateToProps = (state, ownProps) => {
  const questions = filter(state.questions.questions, (question) => {
    return question.assessmentId === ownProps.assessmentId;
  }).map((question) => {
    return question.id;
  });

  return {
    questions,
  };
};

const QuestionList = connect(mapStateToProps)(QuestionListView);

export { QuestionList };
