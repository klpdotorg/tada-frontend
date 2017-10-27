import { push } from 'react-router-redux';

import { checkStatus, post } from './requests';
import { computeRouterPathForEntity } from '../reducers/utils';
import {
  responseReceivedFromServer,
  openNode,
  showBoundaryLoading,
  fetchEntitiesFromServer,
  getBoundaries,
  closeBoundaryLoading,
  toggleModal,
} from './index';
import { SERVER_API_BASE as serverApiBase } from 'config';

export const saveNewCluster = (name, blockId) => (dispatch, getState) => {
  const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
  const options = {
    name,
    parent: blockId,
    boundary_type: 'SC',
    type: boundaryType,
    status: 'AC',
  };

  post(`${serverApiBase}boundaries/`, options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(toggleModal('createCluster'));
    dispatch(openNode(response.id));
    const boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};

export const fetchClusterEntity = (districtId, blockId, clusterId) => dispatch => {
  dispatch(showBoundaryLoading());
  dispatch(openNode(districtId));
  dispatch(fetchEntitiesFromServer(districtId));
  dispatch({
    type: 'BOUNDARIES',
    payload: getBoundaries(2),
  }).then(() => {
    dispatch({
      type: 'BOUNDARIES',
      payload: getBoundaries(districtId),
    }).then(() => {
      dispatch(openNode(blockId));
      dispatch(fetchEntitiesFromServer(blockId));
      dispatch({
        type: 'BOUNDARIES',
        payload: getBoundaries(blockId),
      }).then(() => {
        dispatch(openNode(clusterId));
        dispatch(fetchEntitiesFromServer(clusterId));
        dispatch(closeBoundaryLoading());
      });
    });
  });
};
