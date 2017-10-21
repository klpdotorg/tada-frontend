import { push } from 'react-router-redux';

import { checkStatus } from './utils';
import { computeRouterPathForEntity } from '../reducers/utils';
import { newBoundaryFetch, responseReceivedFromServer, openNode, toggleModal } from './index';

export const saveNewCluster = (name, blockId) => (dispatch, getState) => {
  const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
  const options = {
    name,
    parent: blockId,
    boundary_type: 'SC',
    type: boundaryType,
    status: 'AC',
  };

  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(toggleModal('createCluster'));
    dispatch(openNode(response.id));
    const boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};
