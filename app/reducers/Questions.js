import {
  SET_QUESTION,
  SET_QUESTIONS,
  SHOW_QUESTION_LOADING,
  HIDE_QUESTION_LOADING,
  SET_EDIT_QUESTION_ID,
} from '../actions/types';

const INITIAL_STATE = {
  questions: {},
  editQuestion: '',
  loading: false,
};

const Questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.value,
      };
    case SET_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          ...action.value,
        },
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
    case SET_EDIT_QUESTION_ID:
      return {
        ...state,
        editQuestion: action.value,
      };
    default:
      return state;
  }
};

export { Questions };
