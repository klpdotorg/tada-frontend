import { SERVER_API_BASE } from 'config';
import { push } from 'react-router-redux';
import _ from 'lodash';

import {
  SET_ADD_STUDENTS_FORM_ERRORS,
  SET_LANGUAGES_FOR_ADD_STUDENTS_FORM,
  ADD_STUDENTS_FORM_VALUE_CHANGED,
} from './types';
import { post } from './requests';
import {
  showBoundaryLoading,
  closeBoundaryLoading,
  setBoundaries,
  setStudent,
  openViewStudents,
} from './index';

export const setAddStudentsFormErrors = (value) => {
  return {
    type: SET_ADD_STUDENTS_FORM_ERRORS,
    value,
  };
};

export const setLanguagesForAddStudentsForm = (value) => {
  return {
    type: SET_LANGUAGES_FOR_ADD_STUDENTS_FORM,
    value,
  };
};

export const addStudentsFormValueChanged = (value, rowNumber) => {
  return {
    type: ADD_STUDENTS_FORM_VALUE_CHANGED,
    value,
    rowNumber,
  };
};

export const addStudent = (params) => {
  const { groupId, values, institutionId, dispatch, depth, groupNodeId } = params;

  if (!values.length) {
    dispatch(closeBoundaryLoading());
    dispatch(openViewStudents(groupNodeId, depth));
    return;
  }

  const value = values[0];

  value.institution = institutionId;
  value.status = 'AC';

  post(`${SERVER_API_BASE}studentgroups/${groupId}/students/`, value).then((response) => {
    dispatch(setStudent(response));

    const newValues = values.slice(1);
    const newParams = {
      groupId,
      values: newValues,
      institutionId,
      dispatch,
      depth,
      groupNodeId,
    };

    addStudent(newParams);
  });
};

export const addStudents = (groupId, institutionId, depth, groupNodeId) => {
  return (dispatch, getState) => {
    const state = getState();
    const { values } = state.addStudents;
    const newValues = _.values(values);

    dispatch(showBoundaryLoading());
    const params = {
      groupId,
      values: newValues,
      institutionId,
      dispatch,
      depth,
      groupNodeId,
    };

    addStudent(params);
  };
};
