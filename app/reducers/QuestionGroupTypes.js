import { SET_QUESTION_GROUP_TYPES, RESET } from '../actions/types';

const INITIAL_STATE = {
  types: [],
};

const QuestionGroupTypes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_QUESTION_GROUP_TYPES:
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

export { QuestionGroupTypes };
