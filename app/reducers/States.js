import { SET_STATES, SELECT_STATE, STATES_LOADING, RESET } from '../actions/types';

const INITIAL_STATE = {
  loading: true,
  states: [],
  selectedState: 'ka',
};

const States = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STATES:
      return {
        ...state,
        states: action.value,
      };
    case SELECT_STATE:
      return {
        ...state,
        selectedState: action.value,
      };
    case STATES_LOADING:
      return {
        ...state,
        loading: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { States };
