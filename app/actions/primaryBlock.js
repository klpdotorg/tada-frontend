import { push } from 'react-router-redux';

import { post } from './requests';
import { toggleModal, openEntity } from './index';
import { getEntityDepth, getEntityType, getPath, convertEntitiesToObject } from '../utils';
import { SERVER_API_BASE as serverApiBase } from 'config';
import { SET_BOUNDARIES } from './types';

export const saveNewBlock = (name, districtId) => {
  return (dispatch, getState) => {
    const state = getState();
    const boundaryType = state.schoolSelection.primarySchool ? 'primary' : 'pre';
    const options = {
      name,
      parent: districtId,
      boundary_type: 'SB',
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
