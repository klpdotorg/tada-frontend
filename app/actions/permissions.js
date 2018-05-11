import { SERVER_API_BASE } from 'config';
import { push } from 'react-router-redux';

import { fetchBoundary, showBoundaryLoading } from './index';
import { getPath } from '../utils';
import {
  SELECT_PERMISSIONS_BOUNDARY,
  UNSELECT_PERMISSIONS_BOUNDARY,
  SELECT_PERMISSIONS_USER,
  UNSELECT_PERMISSIONS_USER,
  SET_USER_PERMISSIONS,
} from './types';
import { get } from './requests';

export const openPermissionBoundary = (id, depth) => {
  return (dispatch, getState) => {
    const state = getState();
    const path = getPath(state, id, depth);
    dispatch(push(`/permissions${path}`));
  };
};

export const fetchBoundariesForPermission = (params) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());
    dispatch(fetchBoundary(params));
  };
};

export const selectPermissionsBoundary = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedBoundaries } = state.permissions;
    if (!selectedBoundaries.includes(id)) {
      dispatch({
        type: SELECT_PERMISSIONS_BOUNDARY,
        value: [...selectedBoundaries, id],
      });
    } else {
      dispatch({
        type: UNSELECT_PERMISSIONS_BOUNDARY,
        value: selectedBoundaries.filter((val) => {
          return val !== id;
        }),
      });
    }
  };
};

export const selectPermissionsUser = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedUsers } = state.permissions;
    if (!selectedUsers.includes(id)) {
      dispatch({
        type: SELECT_PERMISSIONS_USER,
        value: [...selectedUsers, id],
      });
    } else {
      dispatch({
        type: UNSELECT_PERMISSIONS_USER,
        value: selectedUsers.filter((val) => {
          return val !== id;
        }),
      });
    }
  };
};

export const fetchUserPermissions = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { id } = state.profile;
    const url = `${SERVER_API_BASE}users/${id}/permissions/`;
    get(url).then((res) => {
      dispatch({
        type: SET_USER_PERMISSIONS,
        value: res,
      });
    });
  };
};
