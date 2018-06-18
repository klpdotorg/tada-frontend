import { SET_LANGUAGES, RESET } from '../actions/types';

const INITIAL_STATE = {
  languages: [],
};

const Languages = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LANGUAGES:
      return {
        ...state,
        languages: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { Languages };
