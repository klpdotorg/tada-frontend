import { SET_CENTERS, SELECT_CENTER } from '../actions/types';

const INITIAL_STATE = {
  centers: [],
  selectedCenter: '',
};

const Centers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CENTERS:
      return {
        ...state,
        centers: action.value,
      };
    case SELECT_CENTER:
      return {
        ...state,
        selectedCenter: action.value,
      };
    default:
      return state;
  }
};

export { Centers };
