import { push } from 'react-router-redux';
import { SERVER_API_BASE as serverApiBase } from 'config';
import Notifications from 'react-notification-system-redux';

import { post } from './requests';
import { openEntity, showCreateBoundaryError, resetCreateBoundaryError } from './index';
import { getEntityDepth, getEntityType, getPath, convertEntitiesToObject } from '../utils';
import { SET_BOUNDARIES, TOGGLE_MODAL } from './types';
import { showSuccessMessage } from './notifications';

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

    post(`${serverApiBase}boundaries/`, options).then((response) => {
      if (response.status === 201) {
        const { data } = response;
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
        dispatch(resetCreateBoundaryError());
        dispatch(push(path));
        dispatch(Notifications.success(showSuccessMessage('Boundary created!', 'Boundary created successfully.')));
      } else {
        dispatch(showCreateBoundaryError(response.data));
      }
    });
  };
};
