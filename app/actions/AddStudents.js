import { SERVER_API_BASE } from 'config';
import Notifications from 'react-notification-system-redux';
import omit from 'lodash.omit';

import {
  SET_ADD_STUDENTS_FORM_ERRORS,
  SET_LANGUAGES_FOR_ADD_STUDENTS_FORM,
  ADD_STUDENTS_FORM_VALUE_CHANGED,
  SET_BOUNDARIES,
  RESET_ADD_STUDENTS_FORM,
} from './types';
import { post } from './requests';
import { showBoundaryLoading, closeBoundaryLoading, openViewStudents } from './index';
import { convertEntitiesToObject } from '../utils';
import { showSuccessMessage } from './notifications';

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

export const addStudents = (groupNodeId, groupId, institutionId, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const { values } = state.addStudents;
    const newValues = Object.values(values);

    dispatch(showBoundaryLoading());

    post(`${SERVER_API_BASE}studentgroups/${groupId}/students/`, newValues).then((response) => {
      const entities = convertEntitiesToObject(response.results);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
        boundariesByParentId: { [depth]: Object.keys(entities) },
      });

      dispatch(closeBoundaryLoading());
      dispatch(openViewStudents(groupNodeId, depth));
    });
  };
};

export const addStudent = (index, groupId, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const { values } = state.addStudents;
    const newValues = Object.values(values);

    dispatch(showBoundaryLoading());
    post(`${SERVER_API_BASE}studentgroups/${groupId}/students/`, [
      newValues[index],
    ]).then((response) => {
      const entities = convertEntitiesToObject(response.results);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
        boundariesByParentId: { [depth]: Object.keys(entities) },
      });
      dispatch({
        type: RESET_ADD_STUDENTS_FORM,
        value: omit(values, index),
      });
      dispatch(Notifications.success(showSuccessMessage('Student Added!', 'Student successfully added.')));
      dispatch(closeBoundaryLoading());
    });
  };
};
