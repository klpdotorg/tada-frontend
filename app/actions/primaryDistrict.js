import { push } from 'react-router-redux';

import { post } from './requests';
import { toggleModal, openEntity } from './index';
import { getEntityType, getEntityDepth, convertEntitiesToObject, getPath } from '../utils';
import { SET_BOUNDARIES } from './types';
import { SERVER_API_BASE as serverApiBase } from 'config';

export const saveNewDistrict = (name) => {
  return (dispatch, getState) => {
    const boundaryType = getState().schoolSelection.primarySchool ? 'primary' : 'pre';
    const options = {
      name,
      type: boundaryType,
      boundary_type: 'SD',
      parent: 2,
      status: 'AC',
    };

    post(`${serverApiBase}boundaries/`, options).then((response) => {
      const state = getState();
      const entities = convertEntitiesToObject([response]);
      dispatch({
        type: SET_BOUNDARIES,
        boundaryDetails: entities,
      });
      dispatch(toggleModal('createDistrict'));

      const type = getEntityType(response);
      const depth = getEntityDepth(response);
      const path = getPath(state, { uniqueId: `${response.id}${type}`, type }, depth);

      dispatch(openEntity({ depth, uniqueId: `${response.id}${type}` }));
      dispatch(push(path));
    });
  };
};
