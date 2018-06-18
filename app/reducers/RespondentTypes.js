import { SET_RESPONDENT_TYPES, RESET } from '../actions/types';

const INITIAL_STATE = {
  types: [],
};

const RespondentTypes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_RESPONDENT_TYPES:
      return {
        ...state,
        types: action.value,
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { RespondentTypes };
