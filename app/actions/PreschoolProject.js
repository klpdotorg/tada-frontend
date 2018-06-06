import { push } from 'react-router-redux';
import { SERVER_API_BASE as serverApiBase } from 'config';

import { post } from './requests';
import { openEntity } from './index';
import { getEntityDepth, getEntityType, getPath, convertEntitiesToObject } from '../utils';
import { SET_BOUNDARIES, TOGGLE_MODAL } from './types';

export const closeCreateProjectModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'createProject',
  };
};

export const saveNewProject = (name, districtId) => {
  return (dispatch, getState) => {
    const state = getState();
    const options = {
      name,
      parent: districtId,
      boundary_type: 'PP',
      type: 'pre',
      status: 'AC',
    };

    post(`${serverApiBase}boundaries/`, options).then(({ data }) => {
      const entities = convertEntitiesToObject([data]);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch(closeCreateProjectModal());

      const type = getEntityType(data);
      const depth = getEntityDepth(data);
      const path = getPath(state, { uniqueId: `${data.id}${type}`, type }, depth);

      dispatch(openEntity({ depth, uniqueId: `${data.id}${type}` }));
      dispatch(push(path));
    });
  };
};
