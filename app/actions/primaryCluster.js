import { push } from 'react-router-redux';

import { post } from './requests';
import { openEntity } from './index';
import { convertEntitiesToObject, getEntityType, getEntityDepth, getPath } from '../utils';
import { SET_BOUNDARIES, TOGGLE_MODAL } from './types';

import { SERVER_API_BASE as serverApiBase } from 'config';

export const toggleCreateClusterModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'createCluster',
  };
};

export const saveNewCluster = (name, blockId) => {
  return (dispatch, getState) => {
    const state = getState();
    const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
    const options = {
      name,
      parent: blockId,
      boundary_type: 'SC',
      type: boundaryType,
      status: 'AC',
    };

    post(`${serverApiBase}boundaries/`, options).then((response) => {
      const entities = convertEntitiesToObject([response]);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch(toggleCreateClusterModal());

      const type = getEntityType(response);
      const depth = getEntityDepth(response);
      const path = getPath(state, { uniqueId: `${response.id}${type}`, type }, depth);

      dispatch(openEntity({ depth, uniqueId: `${response.id}${type}` }));
      dispatch(push(path));
    });
  };
};
