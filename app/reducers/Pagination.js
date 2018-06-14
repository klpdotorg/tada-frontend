import {
  GO_PAGINATION_NEXT,
  GO_PAGINATION_BACK,
  CHANGE_PAGINATION_CURRENT,
  SET_PAGINATION_COUNT,
  RESET,
} from '../actions/types';

const INITIAL_STATE = {
  count: 0,
  current: 1,
};

const Pagination = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GO_PAGINATION_NEXT:
      return {
        ...state,
        current: state.current + 1,
      };
    case GO_PAGINATION_BACK:
      return {
        ...state,
        current: state.current - 1,
      };
    case CHANGE_PAGINATION_CURRENT:
      return {
        ...state,
        current: action.value,
      };
    case SET_PAGINATION_COUNT:
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

export { Pagination };
