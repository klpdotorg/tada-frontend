import { SET_ANSWER_GROUPS, FETCHING_ANSWER_GROUPS, RESET } from '../actions/types';

const INITIAL_STATE = {
  answergroups: [],
  fetching: false,
};

const Answergroups = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ANSWER_GROUPS:
      return {
        ...state,
        answergroups: { ...state.answergroups, ...action.value },
      };
    case FETCHING_ANSWER_GROUPS:
      return {
        ...state,
        fetching: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { Answergroups };
