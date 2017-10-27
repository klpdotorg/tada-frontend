import {
  SET_INSTITUTION_CATS,
  SET_INSTITUTION_LANGUAGES,
} from '../actions/types';

const INITIAL_STATE = {
  languages: [],
  institutionCats: [],
  mgmt: [],
};

const Institution = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_INSTITUTION_CATS:
      return {
        ...state,
        institutionCats: action.value,
      };
    case SET_INSTITUTION_LANGUAGES:
      return {
        ...state,
        languages: action.value,
      };
    default:
      return state;
  }
};

export { Institution };
