import { push } from 'react-router-redux';

import { post } from './requests';
import { toggleModal, openEntity } from './index';
import { convertEntitiesToObject, getEntityType, getEntityDepth, getPath } from '../utils';
import { SET_BOUNDARIES } from './types';

import { SERVER_API_BASE as serverApiBase } from 'config';

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
      dispatch(toggleModal('createBlock'));

      const type = getEntityType(response);
      const depth = getEntityDepth(response);
      const path = getPath(state, { uniqueId: `${response.id}${type}`, type }, depth);

      dispatch(openEntity({ depth, uniqueId: `${response.id}${type}` }));
      dispatch(push(path));
    });
  };
};
