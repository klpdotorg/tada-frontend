import {
  SET_ADD_STUDENTS_FORM_ERRORS,
  SET_LANGUAGES_FOR_ADD_STUDENTS_FORM,
  ADD_STUDENTS_FORM_VALUE_CHANGED,
  RESET_ADD_STUDENTS_FORM,
} from '../actions/types';

const INITIAL_STATE = {
  languages: [],
  formErrors: [],
  rows: 10,
  values: {},
};

const AddStudents = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ADD_STUDENTS_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.value,
      };
    case SET_LANGUAGES_FOR_ADD_STUDENTS_FORM:
      return {
        ...state,
        languages: action.value,
      };
    case ADD_STUDENTS_FORM_VALUE_CHANGED:
      return {
        ...state,
        values: {
          ...state.values,
          [action.rowNumber]: action.value,
        },
      };
    case RESET_ADD_STUDENTS_FORM:
      return {
        ...state,
        values: action.value,
      };
    default:
      return state;
  }
};

export { AddStudents };
