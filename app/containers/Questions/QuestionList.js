import { connect } from 'react-redux';

import { QuestionListView } from '../../components/Questions';
import { openEditQuestionForm } from '../../actions';

const mapStateToProps = (state) => {
  return {
    questions: Object.keys(state.questions.questions),
  };
};

const QuestionList = connect(mapStateToProps, {
  editQuestion: openEditQuestionForm,
})(QuestionListView);

export { QuestionList };
