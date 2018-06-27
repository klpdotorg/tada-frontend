import { SET_QUESTION_TYPES, RESET } from '../actions/types';

const INITIAL_STATE = {
  types: [],
};

const QuestionTypes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_QUESTION_TYPES:
      return {
        ...state,
        types: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { QuestionTypes };
