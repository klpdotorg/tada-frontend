import { connect } from 'react-redux';
import { get } from 'lodash';

import { QuestionListView } from '../../components/Questions';

const mapStateToProps = (state) => {
  return {
    questions: get(state.questions, 'questions', []),
  };
};

const QuestionList = connect(mapStateToProps)(QuestionListView);

export { QuestionList };
