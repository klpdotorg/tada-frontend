import {
  GO_PAGINATION_NEXT,
  GO_PAGINATION_BACK,
  CHANGE_PAGINATION_CURRENT,
  SET_PAGINATION_COUNT,
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
        current: action.current - 1,
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
    default:
      return state;
  }
};

export { Pagination };
