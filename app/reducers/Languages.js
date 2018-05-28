import { SET_LANGUAGES } from '../actions/types';

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
    default:
      return state;
  }
};

export { Languages };
