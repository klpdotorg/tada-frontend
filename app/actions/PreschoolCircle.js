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

    post(`${serverApiBase}boundaries/`, options).then(({ data }) => {
      const entities = convertEntitiesToObject([data]);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch(toggleCreateCircleModal());

      const type = getEntityType(data);
      const depth = getEntityDepth(data);
      const path = getPath(state, { uniqueId: `${data.id}${type}`, type }, depth);

      dispatch(openEntity({ depth, uniqueId: `${data.id}${type}` }));
      dispatch(push(path));
    });
  };
};
