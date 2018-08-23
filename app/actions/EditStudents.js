import { SERVER_API_BASE } from 'config';
import { push } from 'react-router-redux';

import {
  SET_EDIT_STUDENTS_FORM_ERRORS,
  SET_LANGUAGES_FOR_EDIT_STUDENTS_FORM,
  EDIT_STUDENTS_FORM_VALUE_CHANGED,
  SET_BOUNDARIES,
} from './types';
import { put } from './requests';
import { showStudentError, resetStudentError, openViewStudents, toggleSpinner } from './index';
import { convertEntitiesToObject, getPath, getEntityDepth } from '../utils';

export const openEditStudentsForm = (groupNodeId) => {
  return (dispatch, getState) => {
    const state = getState();

    const entity = state.boundaries.boundaryDetails[groupNodeId];

    const depth = getEntityDepth(entity);
    const path = getPath(state, groupNodeId, depth);

    dispatch(push(`${path}/editStudents`));
  };
};

export const setEditStudents = (depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const Ids = state.boundaries.boundariesByParentId[depth];
    Ids.forEach((id) => {
      const value = state.boundaries.boundaryDetails[id];

      dispatch({
        type: EDIT_STUDENTS_FORM_VALUE_CHANGED,
        value,
        rowNumber: id,
      });
    });
  };
};

export const setEditStudentsFormErrors = (value) => {
  return {
    type: SET_EDIT_STUDENTS_FORM_ERRORS,
    value,
  };
};

export const setLanguagesForEditStudentsForm = (value) => {
  return {
    type: SET_LANGUAGES_FOR_EDIT_STUDENTS_FORM,
    value,
  };
};

export const editStudentsFormValueChanged = (value, rowNumber) => {
  return {
    type: EDIT_STUDENTS_FORM_VALUE_CHANGED,
    value,
    rowNumber,
  };
};

export const editStudents = (groupNodeId, groupId, institutionId, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const { values } = state.editStudents;
    const newValues = Object.values(values);

    dispatch(toggleSpinner(true));

    put(
      `${SERVER_API_BASE}studentgroups/${groupId}/students/bulk-update/`,
      newValues,
    ).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        const entities = convertEntitiesToObject(data.results);
        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: entities,
          boundariesByParentId: { [depth]: Object.keys(entities) },
        });

        dispatch(openViewStudents(groupNodeId, depth));
        dispatch(resetStudentError());
      } else {
        dispatch(showStudentError(response.data.results));
      }
      dispatch(toggleSpinner(false));
    });
  };
};
