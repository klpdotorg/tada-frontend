import { SET_STATES, SELECT_STATE, STATES_LOADING } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
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
    default:
      return state;
  }
};

export { States };
