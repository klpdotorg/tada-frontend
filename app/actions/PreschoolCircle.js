import { push } from 'react-router-redux';
import { SERVER_API_BASE as serverApiBase } from 'config';

import { post } from './requests';
import { openEntity } from './index';
import { getEntityDepth, getEntityType, getPath, convertEntitiesToObject } from '../utils';
import { SET_BOUNDARIES, TOGGLE_MODAL } from './types';

export const toggleCreateCircleModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'createCircle',
  };
};

export const saveNewCircle = (name, projectId) => {
  return (dispatch, getState) => {
    const state = getState();
    const options = {
      name,
      parent: projectId,
      type: 'pre',
      boundary_type: 'PC',
      status: 'AC',
    };

    post(`${serverApiBase}boundaries/`, options).then((response) => {
      const entities = convertEntitiesToObject([response]);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch(toggleCreateCircleModal());

      const type = getEntityType(response);
      const depth = getEntityDepth(response);
      const path = getPath(state, { uniqueId: `${response.id}${type}`, type }, depth);

      dispatch(openEntity({ depth, uniqueId: `${response.id}${type}` }));
      dispatch(push(path));
    });
  };
};
