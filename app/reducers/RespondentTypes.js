import { SET_RESPONDENT_TYPES } from '../actions/types';

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
    default:
      return state;
  }
};

export { RespondentTypes };
