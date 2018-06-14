import omit from 'lodash.omit';
import {
  SET_QUESTION,
  SET_QUESTIONS,
  SHOW_QUESTION_LOADING,
  HIDE_QUESTION_LOADING,
  SET_EDIT_QUESTION_ID,
  DELETE_QUESTION,
  CREATE_QUESTION_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  questions: {},
  editQuestion: '',
  loading: false,
  error: {},
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
    case DELETE_QUESTION:
      return {
        ...state,
        questions: omit(state.questions, action.value),
      };
    case CREATE_QUESTION_ERROR:
      return {
        ...state,
        error: action.value,
      };
    default:
      return state;
  }
};

export { Questions };
