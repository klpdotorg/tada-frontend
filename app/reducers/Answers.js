import { SET_ANSWERS, FETCHING_ANSWERS, ON_CHANGE_ANSWER } from '../actions/types';

const INITIAL_STATE = {
  answers: [],
  fetching: false,
};

const Answers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ANSWERS:
      return {
        ...state,
        answers: action.value,
      };
    case ON_CHANGE_ANSWER: {
      return {
        ...state,
        answers: {
          ...state.answers,
          ...action.value,
        },
      };
    }
    case FETCHING_ANSWERS:
      return {
        ...state,
        fetching: action.value,
      };
    default:
      return state;
  }
};

export { Answers };
