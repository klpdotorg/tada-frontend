import { push } from 'react-router-redux';
import { SERVER_API_BASE as serverApiBase } from 'config';
import Notifications from 'react-notification-system-redux';

import { post } from './requests';
import { openEntity, showCreateBoundaryError, resetCreateBoundaryError } from './index';
import { convertEntitiesToObject, getEntityType, getEntityDepth, getPath } from '../utils';
import { SET_BOUNDARIES, TOGGLE_MODAL } from './types';
import { showSuccessMessage } from './notifications';

export const toggleCreateClusterModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createCluster',
    });
    dispatch(resetCreateBoundaryError());
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
      if (response.status === 201) {
        const { data } = response;
        const entities = convertEntitiesToObject([data]);
        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: entities,
        });
        dispatch(toggleCreateClusterModal());

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
