import { SET_QUESTIONS, SHOW_QUESTION_LOADING, CLOSE_QUESTION_LOADING } from '../actions/types';
import { changeArrayToObject } from './utils';

const INITIAL_STATE = {
  questions: {},
  loading: false,
};

const Questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: changeArrayToObject(action.value, 'id'),
      };
    case SHOW_QUESTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLOSE_QUESTION_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export { Questions };
