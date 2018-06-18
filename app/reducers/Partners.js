import { SET_PARTNERS, RESET } from '../actions/types';

const INITIAL_STATE = {
  partners: [],
};

const Partners = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PARTNERS:
      return {
        ...state,
        partners: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { Partners };
