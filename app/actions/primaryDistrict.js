import { push } from 'react-router-redux';

import { post } from './requests';
import {
  responseReceivedFromServer,
  openNode,
  toggleModal,
  setParentNode,
} from './index';
import { SERVER_API_BASE as serverApiBase, DEFAULT_PARENT_NODE_ID } from 'config';

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
    dispatch(setParentNode(DEFAULT_PARENT_NODE_ID));
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(openNode(response.id));
    dispatch(toggleModal('createDistrict'));

    // fetching entity from store
    const boundaryDetails = getState().boundaries.boundaryDetails;
    const boundary = boundaryDetails[`${response.id}${response.boundary_type}`];
    dispatch(push(boundary.path));
  });
};
