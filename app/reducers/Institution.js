import {
  SET_INSTITUTION_CATS,
  SET_INSTITUTION_LANGUAGES,
  SET_INSTITUTION_MANAGEMENTS,
} from '../actions/types';

const INITIAL_STATE = {
  languages: [],
  institutionCats: [],
  managements: [],
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
    case SET_INSTITUTION_MANAGEMENTS:
      return {
        ...state,
        managements: action.value,
      };
    default:
      return state;
  }
};

export { Institution };
