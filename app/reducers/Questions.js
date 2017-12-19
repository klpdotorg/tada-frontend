import { SET_QUESTIONS, SHOW_QUESTION_LOADING, HIDE_QUESTION_LOADING } from '../actions/types';

const INITIAL_STATE = {
  questions: [],
  loading: false,
};

const Questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.value,
      };
    case SHOW_QUESTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HIDE_QUESTION_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export { Questions };
