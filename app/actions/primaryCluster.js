import { push } from 'react-router-redux';

import { post } from './requests';
import {
  responseReceivedFromServer,
  openNode,
  toggleModal,
  setParentNode,
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
    dispatch(setParentNode(`${blockId}SB`));
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(toggleModal('createCluster'));
    dispatch(openNode(response.id));

    // fetching entity from store
    const boundaryDetails = getState().boundaries.boundaryDetails;
    const boundary = boundaryDetails[`${response.id}${response.boundary_type}`];
    dispatch(push(boundary.path));
  });
};
