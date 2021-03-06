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
  ON_CHANGE_USER_SEARCH_TEXT,
  SET_USER_ERROR,
} from './types';
import { convertArrayToObject } from '../utils';
import { showSuccessMessage } from './notifications';

export const setUserError = (value) => {
  return {
    type: SET_USER_ERROR,
    value,
  };
};

export const onChangeUserSearchText = (value) => {
  return {
    type: ON_CHANGE_USER_SEARCH_TEXT,
    value,
  };
};

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
    get(url).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        dispatch({
          type: SET_USERS,
          value: convertArrayToObject(data.results),
        });
        dispatch({
          type: SET_PAGINATION_COUNT,
          value: data.count,
        });
      } else {
        dispatch({
          type: SET_USERS,
          value: {},
        });
        dispatch({
          type: SET_PAGINATION_COUNT,
          value: 0,
        });
      }
      dispatch(hideUsersLoading());
    });
  };
};

export const submitUserSearch = () => {
  return (dispatch, getState) => {
    dispatch(showUsersLoading());
    const state = getState();
    const { searchText } = state.users;
    const { current } = state.pagination;

    const url = `${SERVER_API_BASE}tada/users/?search=${searchText}&per_page=10&page=${current}`;
    get(url).then(({ data }) => {
      dispatch({
        type: SET_USERS,
        value: convertArrayToObject(data.results),
      });
      dispatch({
        type: SET_PAGINATION_COUNT,
        value: data.count,
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
  return (dispatch) => {
    dispatch({
      type: GO_PAGINATION_NEXT,
    });
    dispatch(fetchUsers());
  };
};

export const userPaginationBack = () => {
  return (dispatch) => {
    dispatch({
      type: GO_PAGINATION_BACK,
    });
    dispatch(fetchUsers());
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
    put(url, user).then(({ data }) => {
      dispatch({
        type: UPDATE_USER_OF_USERS,
        value: data,
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
      dispatch(Notifications.success(showSuccessMessage('User Deleted!', 'User successfully deleted.')));
    });
  };
};

export const resetUserPassword = (body) => {
  return (dispatch, getState) => {
    const state = getState();
    const { resetPasswordUserId } = state.users;
    const url = `${SERVER_API_BASE}tada/users/${resetPasswordUserId}/reset-password/`;
    put(url, body).then(({ data }) => {
      if (data) {
        dispatch(Notifications.success(showSuccessMessage('Reset Password', 'User password successfully reset.')));
      }
      dispatch(toggleResetUserPasswordModal());
    });
  };
};
