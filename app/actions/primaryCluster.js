import { push } from 'react-router-redux';

import { post } from './requests';
import { computeRouterPathForEntity } from '../reducers/utils';
import {
  responseReceivedFromServer,
  openNode,
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

  post(`${serverApiBase}boundaries/`, options).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(toggleModal('createCluster'));
    dispatch(openNode(response.id));
    const boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};
