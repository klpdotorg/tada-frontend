import { connect } from 'react-redux';
import { keys } from 'lodash';

import { QuestionListView } from '../../components/Questions';

const mapStateToProps = (state) => {
  const questions = keys(state.questions.questions);

  return {
    questions,
  };
};

const QuestionList = connect(mapStateToProps)(QuestionListView);

export { QuestionList };
