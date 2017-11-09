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

export const fetchStudentGroup = (parentBoundaryId, moreIds) => (dispatch) => {
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

export const modifyStudentGroup = (studentGroup, studentGroupId) => (dispatch) => {
  patch(`${SERVER_API_BASE}studentgroups/${studentGroupId}/`, studentGroup).then((response) => {
    dispatch(setBoundaries({ results: [response] }));
  });
};

export const saveNewClass = options => (dispatch, getState) => {
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
