import {
  SET_ADD_STUDENTS_FORM_ERRORS,
  SET_LANGUAGES_FOR_ADD_STUDENTS_FORM,
  ADD_STUDENTS_FORM_VALUE_CHANGED,
} from './types';

export const setAddStudentsFormErrors = value => ({
  type: SET_ADD_STUDENTS_FORM_ERRORS,
  value,
});

export const setLanguagesForAddStudentsForm = value => ({
  type: SET_LANGUAGES_FOR_ADD_STUDENTS_FORM,
  value,
});

export const addStudentsFormValueChanged = value => ({
  type: ADD_STUDENTS_FORM_VALUE_CHANGED,
  value,
});
