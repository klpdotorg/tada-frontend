import { push } from 'react-router-redux';

import { checkStatus } from './utils';
import { computeRouterPathForEntity } from '../reducers/utils';
import { newBoundaryFetch, responseReceivedFromServer, openNode, toggleModal } from './index';

export const saveNewDistrict = name => (dispatch, getState) => {
  const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
  const options = {
    name,
    type: boundaryType,
    boundary_type: 'SD',
    parent: 2,
    status: 'AC',
  };

  return newBoundaryFetch(options).then(checkStatus).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(openNode(response.id));
    dispatch(toggleModal('createDistrict'));
    const boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};
