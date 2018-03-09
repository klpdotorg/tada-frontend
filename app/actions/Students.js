import { SERVER_API_BASE } from 'config';
import { get, patch } from './requests';
import {
  SELECT_STUDENT_IN_VIEW_STUDENTS,
  TOGGLE_MODAL,
  SET_EDIT_STUDENT_ID,
  SET_STUDENTS,
  SET_STUDENT,
  SET_BOUNDARIES,
} from './types';
import { getEntities, closeBoundaryLoading, requestFailed } from './index';
import { convertEntitiesToObject } from '../utils';

export const selectStudent = (value) => {
  return {
    type: SELECT_STUDENT_IN_VIEW_STUDENTS,
    value,
  };
};

export const setStudents = (value) => {
  return {
    type: SET_STUDENTS,
    value,
  };
};

export const setStudent = (value) => {
  return {
    type: SET_STUDENT,
    value,
  };
};

export const fetchStudents = (parentBoundaryId, moreIds) => {
  return (dispatch) => {
    const getStudentURL = `${SERVER_API_BASE}studentgroups/${parentBoundaryId}/students/`;
    get(getStudentURL)
      .then((data) => {
        const entities = convertEntitiesToObject([data.results]);
        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: entities,
        });

        dispatch(setStudents(Object.keys(entities)));

        if (moreIds && moreIds.length) {
          dispatch(getEntities(moreIds));
        } else {
          dispatch(closeBoundaryLoading());
        }
      })
      .catch((error) => {
        dispatch(requestFailed(error));
      });
  };
};

export const openEditStudentModal = (value) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'editStudent',
    });
    dispatch({
      type: SET_EDIT_STUDENT_ID,
      value,
    });
  };
};

export const modifyStudent = (studentId, options) => {
  return (dispatch) => {
    const editStudentURL = `${SERVER_API_BASE}students/${studentId}/`;

    patch(editStudentURL, options).then((response) => {
      dispatch(setStudent(response));
      dispatch({
        type: TOGGLE_MODAL,
        modal: 'editStudent',
      });
    });
  };
};
