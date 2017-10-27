import { push } from 'react-router-redux';

import { post } from './requests';
import { computeRouterPathForEntity } from '../reducers/utils';
import { responseReceivedFromServer, openNode, toggleModal } from './index';
import { SERVER_API_BASE as serverApiBase } from 'config';

export const saveNewDistrict = name => (dispatch, getState) => {
  const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
  const options = {
    name,
    type: boundaryType,
    boundary_type: 'SD',
    parent: 2,
    status: 'AC',
  };

  post(`${serverApiBase}boundaries/`, options).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(openNode(response.id));
    dispatch(toggleModal('createDistrict'));
    const boundary = computeRouterPathForEntity(response, getState().boundaries.boundaryDetails);
    dispatch(push(boundary.path));
  });
};
