import { push } from 'react-router-redux';
import Notifications from 'react-notification-system-redux';

import { SERVER_API_BASE } from 'config';
import { get, post, patch, deleteRequest } from './requests';
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
  toggleSpinner,
  resetEditBoundaryError,
  showEditBoundaryError,
  showCreateBoundaryError,
  resetCreateBoundaryError,
  resetStudentError,
} from './index';
import { SET_BOUNDARIES } from './types';
import { getPath, getEntityType, getEntityDepth, convertEntitiesToObject } from '../utils';
import { showSuccessMessage, errorNotification } from './notifications';

export const openViewStudents = (id, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const path = getPath(state, id, depth);
    dispatch(resetStudentError());
    dispatch(push(`${path}/students`));
  };
};

export const openAddStudents = (id, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const path = getPath(state, id, depth);
    dispatch(resetStudentError());
    dispatch(push(`${path}/addStudents`));
  };
};

export const fetchStudentGroup = (parentBoundaryId, moreIds) => {
  return (dispatch) => {
    const studentgroupUrl = `${SERVER_API_BASE}institutions/${parentBoundaryId}/studentgroups/`;
    return get(studentgroupUrl)
      .then(({ data }) => {
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
    dispatch(toggleSpinner(true));

    patch(`${SERVER_API_BASE}studentgroups/${studentGroupId}/`, studentGroup).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        const entities = convertEntitiesToObject([data]);

        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: entities,
        });
        dispatch(resetEditBoundaryError());
        dispatch(Notifications.success(showSuccessMessage('Student Group Modified!', 'Student Group successfully modified!')));
      } else {
        dispatch(showEditBoundaryError(response.data));
      }
      dispatch(toggleSpinner(false));
    });
  };
};

export const saveNewClass = (options) => {
  return (dispatch, getState) => {
    post(`${SERVER_API_BASE}studentgroups/`, options).then((response) => {
      if (response.status === 201) {
        const { data } = response;
        const state = getState();
        const entities = convertEntitiesToObject([data]);
        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: entities,
        });
        dispatch(toggleModal('createClass'));

        const type = getEntityType(data);
        const depth = getEntityDepth(data);
        const path = getPath(state, { uniqueId: `${data.id}${type}`, type }, depth);

        dispatch(openEntity({ depth, uniqueId: `${data.id}${type}` }));
        dispatch(resetCreateBoundaryError());
        dispatch(push(path));
      } else {
        dispatch(showCreateBoundaryError(response.data));
      }
    });
  };
};

export const deleteStudentGroup = (params) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());
    dispatch(closeConfirmModal());

    return deleteRequest(`${SERVER_API_BASE}institutions/${params.parentId}/studentgroups/${params.boundaryId}/`)
      .then((response) => {
        if (response.status === 204) {
          dispatch(removeEntity({
            boundaryId: params.boundaryId,
            boundaryNodeId: params.boundaryNodeId,
            parentId: params.parentNodeId,
          }));
          dispatch(Notifications.success(showSuccessMessage('Student Group Deleted!', 'Student Group successfully deleted!')));
        } else {
          dispatch(Notifications.error(errorNotification('Error!', 'Student Group not deleted!')));
        }
      })
      .catch((error) => {
        console.log('request failed', error);
      });
  };
};
