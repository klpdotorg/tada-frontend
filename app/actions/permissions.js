import { push } from 'react-router-redux';

import { fetchBoundary, showBoundaryLoading } from './index';

export const openPermissionBoundary = (id, type) => {
  return (dispatch) => {
    const path = `/permissions/${type}/${id}`;
    dispatch(push(path));
  };
};

export const fetchBoundariesForPermission = (params) => {
  return (dispatch) => {
    dispatch(showBoundaryLoading());
    dispatch(fetchBoundary(params));
  };
};
