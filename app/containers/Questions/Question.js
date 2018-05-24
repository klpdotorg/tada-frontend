import { connect } from 'react-redux';
import get from 'lodash.get';

import { QuestionView } from '../../components/Questions';
import { openEditQuestionForm, deleteQuestion } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    question: get(state.questions.questions, ownProps.id, {}),
  };
};

const Question = connect(mapStateToProps, {
  editQuestion: openEditQuestionForm,
  deleteQuestion,
})(QuestionView);

export { Question };
