import { push } from 'react-router-redux';

import { checkStatus } from './utils';
import { computeRouterPathForEntity } from '../reducers/utils';
import { newBoundaryFetch, responseReceivedFromServer, openNode, toggleModal } from './index';

export const saveNewBlock = (name, districtId) => (dispatch, getState) => {
  const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
  const options = {
    name,
    parent: districtId,
    boundary_type: 'SB',
    type: boundaryType,
    status: 'AC',
  };

  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(toggleModal('createBlock'));
    dispatch(openNode(response.id));
    const boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};
