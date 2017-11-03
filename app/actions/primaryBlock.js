import { push } from 'react-router-redux';

import { post } from './requests';
import {
  responseReceivedFromServer,
  openNode,
  toggleModal,
} from './index';
import { SERVER_API_BASE as serverApiBase } from 'config';

export const saveNewBlock = (name, districtId) => (dispatch, getState) => {
  const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
  const options = {
    name,
    parent: districtId,
    boundary_type: 'SB',
    type: boundaryType,
    status: 'AC',
  };

  post(`${serverApiBase}boundaries/`, options).then(response => {
    dispatch(responseReceivedFromServer({ results: [response] }));
    dispatch(toggleModal('createBlock'));
    dispatch(openNode(response.id));

    // fetching entity from store
    const boundaryDetails = getState().boundaries.boundaryDetails;
    const boundary = boundaryDetails[`${response.id}${response.boundary_type}`];
    console.log(boundary);
    dispatch(push(boundary.path));
  });
};
