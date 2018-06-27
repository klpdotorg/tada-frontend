import { push } from 'react-router-redux';
import { SERVER_API_BASE as serverApiBase } from 'config';

import { TOGGLE_MODAL, SET_BOUNDARIES } from './types';
import { post } from './requests';
import {
  toggleModal,
  openEntity,
  showCreateBoundaryError,
  resetCreateBoundaryError,
} from './index';
import { getEntityType, getEntityDepth, convertEntitiesToObject, getPath } from '../utils';

export const toggleDistrictModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createDistrict',
    });
    dispatch(resetCreateBoundaryError());
  };
};

export const toggleProjectModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createProject',
    });
    dispatch(resetCreateBoundaryError());
  };
};

export const toggleBlockModal = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'createBlock',
    });
    dispatch(resetCreateBoundaryError());
  };
};

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
      if (response.status === 201) {
        const { data } = response;
        const state = getState();
        const entities = convertEntitiesToObject([data]);
        dispatch({
          type: SET_BOUNDARIES,
          boundaryDetails: entities,
        });
        dispatch(toggleModal('createDistrict'));

        const type = getEntityType(data);
        const depth = getEntityDepth(data);
        const path = getPath(state, { uniqueId: `${data.id}${type}`, type }, depth);

        dispatch(openEntity({ depth, uniqueId: `${data.id}${type}` }));
        dispatch(push(path));
        dispatch(resetCreateBoundaryError());
      } else {
        dispatch(showCreateBoundaryError(response.data));
      }
    });
  };
};
