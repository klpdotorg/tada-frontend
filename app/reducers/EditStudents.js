import {
  SET_EDIT_STUDENTS_FORM_ERRORS,
  SET_LANGUAGES_FOR_EDIT_STUDENTS_FORM,
  EDIT_STUDENTS_FORM_VALUE_CHANGED,
  RESET,
} from '../actions/types';

const INITIAL_STATE = {
  languages: [],
  formErrors: [],
  values: {},
};

const EditStudents = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EDIT_STUDENTS_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.value,
      };
    case SET_LANGUAGES_FOR_EDIT_STUDENTS_FORM:
      return {
        ...state,
        languages: action.value,
      };
    case EDIT_STUDENTS_FORM_VALUE_CHANGED:
      return {
        ...state,
        values: {
          ...state.values,
          [action.rowNumber]: action.value,
        },
      };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export { EditStudents };
