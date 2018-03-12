import { SERVER_API_BASE } from 'config';
import _ from 'lodash';

import {
  SET_ADD_STUDENTS_FORM_ERRORS,
  SET_LANGUAGES_FOR_ADD_STUDENTS_FORM,
  ADD_STUDENTS_FORM_VALUE_CHANGED,
  SET_BOUNDARIES,
} from './types';
import { post } from './requests';
import { showBoundaryLoading, closeBoundaryLoading, openViewStudents } from './index';
import { convertEntitiesToObject } from '../utils';

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

export const addStudents = (groupId, institutionId, depth, groupNodeId) => {
  return (dispatch, getState) => {
    const state = getState();
    const { values } = state.addStudents;
    const newValues = _.values(values);

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
