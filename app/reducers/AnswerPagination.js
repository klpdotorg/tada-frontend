import {
  GO_ANSWER_PAGINATION_NEXT,
  GO_ANSWER_PAGINATION_BACK,
  CHANGE_ANSWER_PAGINATION_CURRENT,
  SET_ANSWER_PAGINATION_COUNT,
  RESET,
} from '../actions/types';

const INITIAL_STATE = {
  count: 0,
  current: 1,
};

const AnswerPagination = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GO_ANSWER_PAGINATION_NEXT:
      return {
        ...state,
        current: state.current + 1,
      };
    case GO_ANSWER_PAGINATION_BACK:
      return {
        ...state,
        current: state.current - 1,
      };
    case CHANGE_ANSWER_PAGINATION_CURRENT:
      return {
        ...state,
        current: action.value,
      };
    case SET_ANSWER_PAGINATION_COUNT:
      return {
        ...state,
        count: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { AnswerPagination };
