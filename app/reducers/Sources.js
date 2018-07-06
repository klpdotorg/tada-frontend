import { SET_SOURCES, RESET } from '../actions/types';

const INITIAL_STATE = {
  sources: [],
};

const Sources = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SOURCES:
      return {
        ...state,
        sources: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { Sources };
