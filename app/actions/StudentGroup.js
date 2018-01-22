import { push } from 'react-router-redux';

import { SERVER_API_BASE } from 'config';
import { get, post, patch } from './requests';
import { getBoundaryType } from '../reducers/utils';
import {
  setBoundaries,
  getEntities,
  closeBoundaryLoading,
  requestFailed,
  responseReceivedFromServer,
  toggleModal,
  openNode,
} from './index';
import { getPath } from '../utils';

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
    patch(`${SERVER_API_BASE}studentgroups/${studentGroupId}/`, studentGroup).then((response) => {
      dispatch(setBoundaries({ results: [response] }));
    });
  };
};

export const saveNewClass = (options) => {
  return (dispatch, getState) => {
    post(`${SERVER_API_BASE}studentgroups/`, options).then((response) => {
      const type = getBoundaryType(response);
      dispatch(responseReceivedFromServer({ results: [response] }));
      dispatch(toggleModal('createClass'));
      dispatch(openNode(response.id));

      const boundaryDetails = getState().boundaries.boundaryDetails;
      const boundary = boundaryDetails[`${response.id}${type}`];
      dispatch(push(boundary.path));
    });
  };
};
