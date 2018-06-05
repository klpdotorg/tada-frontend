import { SERVER_API_BASE } from 'config';
import pull from 'lodash.pull';
import omit from 'lodash.omit';
import remove from 'lodash.remove';

import { get, put, deleteRequest } from './requests';
import {
  SELECT_STUDENT_IN_VIEW_STUDENTS,
  TOGGLE_MODAL,
  SET_EDIT_STUDENT_ID,
  SET_STUDENTS,
  SET_STUDENT,
  SET_BOUNDARIES,
  UNCOLLAPSED_BOUNDARIES,
  DELETE_BOUNDARY_NODE,
} from './types';
import {
  getEntities,
  closeBoundaryLoading,
  requestFailed,
  showBoundaryLoading,
  closeConfirmModal,
} from './index';
import { convertEntitiesToObject, getEntityDepth } from '../utils';

export const resetSelectedStudents = () => {
  return {
    type: SELECT_STUDENT_IN_VIEW_STUDENTS,
    value: [],
  };
};

export const selectStudent = (value) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedStudents } = state.students;

    if (selectedStudents.includes(value)) {
      dispatch({
        type: SELECT_STUDENT_IN_VIEW_STUDENTS,
        value: remove(selectedStudents, (val) => {
          return val !== value;
        }),
      });
    } else {
      dispatch({
        type: SELECT_STUDENT_IN_VIEW_STUDENTS,
        value: [...selectedStudents, value],
      });
    }
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

export const fetchStudentBoundaries = (parentId) => {
  return (dispatch, getState) => {
    const state = getState();
    const parentEntity = state.boundaries.boundaryDetails[parentId];
    const parentDepth = getEntityDepth(parentEntity);
    const getStudentURL = `${SERVER_API_BASE}studentgroups/${parentEntity.id}/students/`;

    get(getStudentURL)
      .then((data) => {
        const entities = convertEntitiesToObject(data.results);
        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: entities,
          boundariesByParentId: {
            [parentDepth]: Object.keys(entities),
          },
        });

        dispatch(closeBoundaryLoading());
      })
      .catch((error) => {
        dispatch(requestFailed(error));
      });
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

export const modifyStudent = (groupId, options) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'editStudent',
    });

    const editStudentURL = `${SERVER_API_BASE}studentgroups/${groupId}/students/`;

    put(editStudentURL, [options]).then((response) => {
      const entities = convertEntitiesToObject(response.results);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch(closeBoundaryLoading());
    });
  };
};

export const deleteStudent = (params) => {
  return (dispatch, getState) => {
    dispatch(showBoundaryLoading());
    dispatch(closeConfirmModal());

    deleteRequest(`${SERVER_API_BASE}students/${params.boundaryId}/`).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        const { parentId, boundaryNodeId } = params;
        const state = getState();
        const parentEntity = state.boundaries.boundaryDetails[parentId];
        const parentDepth = getEntityDepth(parentEntity);

        const boundariesByParentId = {
          ...state.boundaries.boundariesByParentId,
          [parentDepth]: pull(state.boundaries.boundariesByParentId[parentDepth], boundaryNodeId),
        };
        const newUnCollapsedEntities = omit(state.boundaries.uncollapsedEntities, parentDepth + 1);

        dispatch({
          type: SET_BOUNDARIES,
          boundariesByParentId,
        });
        dispatch({
          type: UNCOLLAPSED_BOUNDARIES,
          value: newUnCollapsedEntities,
        });
        dispatch({
          type: DELETE_BOUNDARY_NODE,
          value: boundaryNodeId,
        });
        dispatch(closeBoundaryLoading());
      }
    });
  };
};
