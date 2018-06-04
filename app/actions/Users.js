import { SERVER_API_BASE } from 'config';
import Notifications from 'react-notification-system-redux';

import { get, put, deleteRequest } from './requests';
import {
  SET_USERS,
  SHOW_USERS_LOADING,
  HIDE_USERS_LOADING,
  SET_EDIT_USER_ID,
  TOGGLE_MODAL,
  UPDATE_USER_OF_USERS,
  SELECT_USER,
  DELETE_USERS,
  GO_PAGINATION_NEXT,
  GO_PAGINATION_BACK,
  CHANGE_PAGINATION_CURRENT,
  SET_PAGINATION_COUNT,
  SET_ID_FOR_RESET_PASSWORD,
} from './types';
import { convertArrayToObject } from '../utils';
import { showSuccessMessage } from './notifications';

const showUsersLoading = () => {
  return {
    type: SHOW_USERS_LOADING,
  };
};

const hideUsersLoading = () => {
  return {
    type: HIDE_USERS_LOADING,
  };
};

export const fetchUsers = () => {
  return (dispatch, getState) => {
    dispatch(showUsersLoading());
    const state = getState();
    const { current } = state.pagination;

    const url = `${SERVER_API_BASE}tada/users/?per_page=10&page=${current}`;
    get(url).then((res) => {
      dispatch({
        type: SET_USERS,
        value: convertArrayToObject(res.results),
      });
      dispatch({
        type: SET_PAGINATION_COUNT,
        value: res.count,
      });
      dispatch(hideUsersLoading());
    });
  };
};

export const userPaginationChange = (value) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_PAGINATION_CURRENT,
      value,
    });
    dispatch(fetchUsers());
  };
};

export const userPaginationNext = () => {
  return {
    type: GO_PAGINATION_NEXT,
  };
};

export const userPaginationBack = () => {
  return {
    type: GO_PAGINATION_BACK,
  };
};

export const toggleEditUserModal = () => {
  return {
    type: TOGGLE_MODAL,
    modal: 'editUser',
  };
};

export const toggleResetUserPasswordModal = (value) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MODAL,
      modal: 'resetUserPassword',
    });
    dispatch({
      type: SET_ID_FOR_RESET_PASSWORD,
      value,
    });
  };
};

export const openEditUserModal = (value) => {
  return (dispatch) => {
    dispatch({
      type: SET_EDIT_USER_ID,
      value,
    });
    dispatch(toggleEditUserModal());
  };
};

export const saveUser = (user) => {
  return (dispatch) => {
    const url = `${SERVER_API_BASE}tada/users/${user.id}/`;
    put(url, user).then((res) => {
      dispatch({
        type: UPDATE_USER_OF_USERS,
        value: res,
      });
      dispatch(toggleEditUserModal());
    });
  };
};

export const selectUser = (value) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedUsers } = state.users;

    if (selectedUsers.includes(value)) {
      const users = selectedUsers.filter((user) => {
        return user !== value;
      });
      dispatch({
        type: SELECT_USER,
        value: users,
      });
    } else {
      dispatch({
        type: SELECT_USER,
        value: [...selectedUsers, value],
      });
    }
  };
};

export const deleteUsers = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedUsers } = state.users;
    const userPromises = selectedUsers.map((id) => {
      const url = `${SERVER_API_BASE}tada/users/${id}/`;
      return deleteRequest(url);
    });

    Promise.all(userPromises).then(() => {
      dispatch({
        type: DELETE_USERS,
        value: selectedUsers,
      });
      dispatch({
        type: SELECT_USER,
        value: [],
      });
    });
  };
};

export const resetUserPassword = (body) => {
  return (dispatch, getState) => {
    const state = getState();
    const { resetPasswordUserId } = state.users;
    console.log(body, resetPasswordUserId);
    const url = `${SERVER_API_BASE}tada/users/${resetPasswordUserId}/reset-password`;
    put(url, body).then((response) => {
      console.log(response);
      if (response) {
        dispatch(Notifications.success(showSuccessMessage('Reset Password', 'User password successfully reset.')));
      }
      dispatch(toggleResetUserPasswordModal());
    });
  };
};
