import { push } from 'react-router-redux';

import { SERVER_API_BASE } from 'config';
import { get, post, patch } from './requests';
import {
  setBoundaries,
  getEntities,
  closeBoundaryLoading,
  showBoundaryLoading,
  requestFailed,
  toggleModal,
  openEntity,
  removeEntity,
  closeConfirmModal,
} from './index';
import { SET_BOUNDARIES } from './types';
import { getPath, getEntityType, getEntityDepth, convertEntitiesToObject } from '../utils';

export const openViewStudents = (id, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const path = getPath(state, id, depth);

    dispatch(push(`${path}/students`));
  };
};

export const openAddStudents = (id, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const path = getPath(state, id, depth);

    dispatch(push(`${path}/addStudents`));
  };
};

export const fetchStudentGroup = (parentBoundaryId, moreIds) => {
  return (dispatch) => {
    const studentgroupUrl = `${SERVER_API_BASE}institutions/${parentBoundaryId}/studentgroups/`;
    return get(studentgroupUrl)
      .then((data) => {
        dispatch(setBoundaries(data));
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

export const modifyStudentGroup = (studentGroup, studentGroupId) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());

    patch(`${SERVER_API_BASE}studentgroups/${studentGroupId}/`, studentGroup).then((response) => {
      const entities = convertEntitiesToObject([response]);

      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch(closeBoundaryLoading());
    });
  };
};

export const saveNewClass = (options) => {
  return (dispatch, getState) => {
    post(`${SERVER_API_BASE}studentgroups/`, options).then((response) => {
      const state = getState();
      const entities = convertEntitiesToObject([response]);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch(toggleModal('createClass'));

      const type = getEntityType(response);
      const depth = getEntityDepth(response);
      const path = getPath(state, { uniqueId: `${response.id}${type}`, type }, depth);

      dispatch(openEntity({ depth, uniqueId: `${response.id}${type}` }));
      dispatch(push(path));
    });
  };
};

export const deleteStudentGroup = (params) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());
    dispatch(closeConfirmModal());
    dispatch(removeEntity(params));
  };
};
