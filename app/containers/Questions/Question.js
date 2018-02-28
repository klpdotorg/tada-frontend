import { connect } from 'react-redux';
import { get } from 'lodash';

import { QuestionView } from '../../components/Questions';
import { openEditQuestionForm } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    question: get(state.questions.questions, ownProps.id, {}),
  };
};

const Question = connect(mapStateToProps, { editQuestion: openEditQuestionForm })(QuestionView);

export { Question };
